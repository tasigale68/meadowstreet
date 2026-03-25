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
    "w-full px-4 py-3 rounded-xl border border-charcoal/[0.08] bg-white font-body text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:ring-2 focus:ring-green-brand/15 focus:border-green-brand/25 transition-all text-[15px]";

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-offwhite">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 lg:px-8 ${
          visible ? "animate-[fade-up_0.7s_ease-out_both]" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: info */}
          <div className="lg:col-span-4 lg:pt-4">
            <span className="font-body font-semibold text-purple-brand text-xs tracking-widest uppercase">
              Get in Touch
            </span>
            <h2 className="font-display font-700 text-4xl md:text-5xl mt-3 tracking-tight leading-[1.08]">
              Refer a Participant
            </h2>
            <p className="font-body text-warm-gray text-base mt-5 leading-relaxed">
              Fill in the details and our team will be in touch within 24 hours.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-brand/8 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-charcoal font-medium text-sm">Email us</p>
                  <a href="mailto:cooper@meadowstreet.com.au" className="font-body text-warm-gray text-sm hover:text-green-brand transition-colors">
                    cooper@meadowstreet.com.au
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-brand/8 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-charcoal font-medium text-sm">Response time</p>
                  <p className="font-body text-warm-gray text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-8">
            {status === "success" ? (
              <div className="bg-green-light border border-green-brand/10 rounded-2xl p-8 md:p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-brand mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-700 text-2xl mb-3">Referral Submitted!</h3>
                <p className="font-body text-warm-gray mb-6">
                  Thank you! Our team will review the referral and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-body font-semibold text-green-brand hover:text-green-dark transition-colors text-sm"
                >
                  Submit another referral
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-charcoal/[0.06] p-7 md:p-9"
              >
                {/* Participant */}
                <div className="mb-9">
                  <h3 className="font-display font-700 text-lg mb-5 pb-3 border-b border-charcoal/[0.05]">
                    Participant Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">
                        Participant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.participant_name}
                        onChange={(e) => setForm({ ...form, participant_name: e.target.value })}
                        className={inputClass}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">Email</label>
                      <input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className={inputClass} placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">Phone</label>
                      <input type="tel" value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} className={inputClass} placeholder="04XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">NDIS Number</label>
                      <input type="text" value={form.ndis_number} onChange={(e) => setForm({ ...form, ndis_number: e.target.value })} className={inputClass} placeholder="NDIS participant number" />
                    </div>
                  </div>
                </div>

                {/* Support Type */}
                <div className="mb-9">
                  <h3 className="font-display font-700 text-lg mb-5 pb-3 border-b border-charcoal/[0.05]">
                    Support Required
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {supportTypes.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          form.support_type.includes(type)
                            ? "border-green-brand bg-green-light/40 shadow-sm"
                            : "border-charcoal/[0.06] hover:border-charcoal/[0.12]"
                        }`}
                      >
                        <input type="checkbox" checked={form.support_type.includes(type)} onChange={() => handleCheckbox(type)} className="sr-only" />
                        <div className={`w-4.5 h-4.5 rounded flex-shrink-0 flex items-center justify-center transition-all ${form.support_type.includes(type) ? "bg-green-brand" : "border-2 border-charcoal/15"}`}>
                          {form.support_type.includes(type) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="font-body font-medium text-[13px]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Coordinator */}
                <div className="mb-9">
                  <h3 className="font-display font-700 text-lg mb-5 pb-3 border-b border-charcoal/[0.05]">
                    Support Coordinator Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">Coordinator Name</label>
                      <input type="text" value={form.coordinator_name} onChange={(e) => setForm({ ...form, coordinator_name: e.target.value })} className={inputClass} placeholder="Coordinator's full name" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">Coordinator Email</label>
                      <input type="email" value={form.coordinator_email} onChange={(e) => setForm({ ...form, coordinator_email: e.target.value })} className={inputClass} placeholder="coordinator@example.com" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-9">
                  <label className="block font-body font-medium text-sm text-charcoal/60 mb-1.5">Additional Information</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className={`${inputClass} resize-none`} placeholder="Any extra details about the participant's needs, goals, or preferences..." />
                </div>

                {status === "error" && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-body text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-brand text-white font-body font-semibold text-base px-8 py-4 rounded-xl hover:bg-green-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-3">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
        </div>
      </div>
    </section>
  );
}
