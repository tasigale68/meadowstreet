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

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-charcoal/[0.08] bg-cream/50 font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-green-brand/20 focus:border-green-brand/30 transition-all";

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-cream">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-6 lg:px-8 ${
          visible ? "animate-[fade-up_0.8s_ease-out_both]" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="font-sans font-semibold text-purple-brand text-sm tracking-wide uppercase">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.1]">
            Refer a <em className="italic text-green-brand">Participant</em>
          </h2>
          <p className="font-sans text-warm-gray text-lg mt-5 max-w-md mx-auto">
            Fill in the details below and our team will be in touch within 24
            hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-light border border-green-brand/15 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-brand mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
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
            <h3 className="font-serif text-2xl mb-3">
              Referral Submitted!
            </h3>
            <p className="font-sans text-warm-gray mb-6">
              Thank you! Our team will review the referral and get back to you
              within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="font-sans font-semibold text-green-brand hover:text-green-dark transition-colors text-sm"
            >
              Submit another referral
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-charcoal/[0.06] p-8 md:p-10"
          >
            {/* Participant Info */}
            <div className="mb-10">
              <h3 className="font-serif text-xl mb-6 pb-4 border-b border-charcoal/[0.06]">
                Participant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    Participant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.participant_name}
                    onChange={(e) =>
                      setForm({ ...form, participant_name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.contact_email}
                    onChange={(e) =>
                      setForm({ ...form, contact_email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) =>
                      setForm({ ...form, contact_phone: e.target.value })
                    }
                    className={inputClass}
                    placeholder="04XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    NDIS Number
                  </label>
                  <input
                    type="text"
                    value={form.ndis_number}
                    onChange={(e) =>
                      setForm({ ...form, ndis_number: e.target.value })
                    }
                    className={inputClass}
                    placeholder="NDIS participant number"
                  />
                </div>
              </div>
            </div>

            {/* Support Type */}
            <div className="mb-10">
              <h3 className="font-serif text-xl mb-6 pb-4 border-b border-charcoal/[0.06]">
                Support Required
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {supportTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      form.support_type.includes(type)
                        ? "border-green-brand bg-green-light/40"
                        : "border-charcoal/[0.06] hover:border-charcoal/[0.12]"
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
                          : "border-2 border-charcoal/20"
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
                    <span className="font-sans font-medium text-sm">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coordinator Info */}
            <div className="mb-10">
              <h3 className="font-serif text-xl mb-6 pb-4 border-b border-charcoal/[0.06]">
                Support Coordinator Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={form.coordinator_name}
                    onChange={(e) =>
                      setForm({ ...form, coordinator_name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Coordinator's full name"
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                    Coordinator Email
                  </label>
                  <input
                    type="email"
                    value={form.coordinator_email}
                    onChange={(e) =>
                      setForm({ ...form, coordinator_email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="coordinator@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-10">
              <label className="block font-sans font-medium text-sm text-charcoal/70 mb-2">
                Additional Information
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Any extra details about the participant's needs, goals, or preferences..."
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-sans text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-brand text-white font-sans font-semibold text-base px-8 py-4 rounded-xl hover:bg-green-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
