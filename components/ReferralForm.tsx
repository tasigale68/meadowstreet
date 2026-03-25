"use client";

import { useState, useEffect, useRef } from "react";

const supportTypes = [
  "SIL",
  "Community Access",
  "In-Home Support",
  "Daily Living",
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ReferralForm() {
  const { ref, visible } = useInView();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    participant_name: "",
    contact_email: "",
    contact_phone: "",
    ndis_number: "",
    support_type: [] as string[],
    coordinator_name: "",
    coordinator_email: "",
    message: "",
  });

  const handleCheckbox = (type: string) => {
    setForm((prev) => ({
      ...prev,
      support_type: prev.support_type.includes(type)
        ? prev.support_type.filter((t) => t !== type)
        : [...prev.support_type, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.participant_name.trim()) return;

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setForm({
        participant_name: "",
        contact_email: "",
        contact_phone: "",
        ndis_number: "",
        support_type: [],
        coordinator_name: "",
        coordinator_email: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to submit referral"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-offwhite">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-6 ${
          visible ? "animate-[fade-in_0.8s_ease-out_both]" : "opacity-0"
        }`}
      >
        <div className="text-center mb-12 md:mb-16">
          <p className="font-satoshi font-semibold text-purple-brand text-sm tracking-widest uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Refer a{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              Participant
            </span>
          </h2>
          <p className="font-satoshi text-lg text-charcoal/60 max-w-xl mx-auto">
            Fill in the details below and our team will be in touch within 24
            hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-light border border-green-brand/20 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-brand mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-clash text-2xl font-bold mb-3">
              Referral Submitted!
            </h3>
            <p className="font-satoshi text-charcoal/60 mb-6">
              Thank you! Our team will review the referral and get back to you
              within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="font-satoshi font-semibold text-green-brand hover:text-green-dark transition-colors"
            >
              Submit another referral
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            {/* Participant Info */}
            <div className="mb-8">
              <h3 className="font-clash text-xl font-bold mb-6 pb-3 border-b border-gray-100">
                Participant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    Participant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.participant_name}
                    onChange={(e) =>
                      setForm({ ...form, participant_name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.contact_email}
                    onChange={(e) =>
                      setForm({ ...form, contact_email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) =>
                      setForm({ ...form, contact_phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="04XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    NDIS Number
                  </label>
                  <input
                    type="text"
                    value={form.ndis_number}
                    onChange={(e) =>
                      setForm({ ...form, ndis_number: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="NDIS participant number"
                  />
                </div>
              </div>
            </div>

            {/* Support Type */}
            <div className="mb-8">
              <h3 className="font-clash text-xl font-bold mb-6 pb-3 border-b border-gray-100">
                Support Required
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {supportTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      form.support_type.includes(type)
                        ? "border-green-brand bg-green-light/50 shadow-sm"
                        : "border-gray-200 hover:border-green-brand/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.support_type.includes(type)}
                      onChange={() => handleCheckbox(type)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                        form.support_type.includes(type)
                          ? "bg-green-brand"
                          : "border-2 border-gray-300"
                      }`}
                    >
                      {form.support_type.includes(type) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-satoshi font-medium text-sm">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coordinator Info */}
            <div className="mb-8">
              <h3 className="font-clash text-xl font-bold mb-6 pb-3 border-b border-gray-100">
                Support Coordinator Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={form.coordinator_name}
                    onChange={(e) =>
                      setForm({ ...form, coordinator_name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="Coordinator's full name"
                  />
                </div>
                <div>
                  <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                    Coordinator Email
                  </label>
                  <input
                    type="email"
                    value={form.coordinator_email}
                    onChange={(e) =>
                      setForm({ ...form, coordinator_email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all"
                    placeholder="coordinator@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block font-satoshi font-medium text-sm text-charcoal/80 mb-2">
                Additional Information
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 font-satoshi text-charcoal focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-all resize-none"
                placeholder="Any extra details about the participant's needs, goals, or preferences..."
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-satoshi text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-brand to-purple-brand text-white font-clash font-bold text-lg px-8 py-4 rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="inline-flex items-center gap-3">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Referral"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
