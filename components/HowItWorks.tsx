"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Referral",
    description:
      "Submit a referral or get in touch. We will respond within 24 hours.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "We meet you, understand your goals, and build a tailored support plan.",
  },
  {
    number: "03",
    title: "Support Starts",
    description:
      "Your matched support team begins: flexible, responsive, and person centred.",
  },
];

function useInView(threshold = 0.15) {
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

export default function HowItWorks() {
  const { ref, visible } = useInView();

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-16">
          <span className="font-body font-semibold text-green-brand text-xs tracking-widest uppercase">
            Getting Started
          </span>
          <h2 className="font-display font-700 text-4xl md:text-5xl mt-3 tracking-tight">
            How It Works
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative text-center md:text-left ${
                visible ? "animate-[fade-up_0.5s_ease-out_both]" : "opacity-0"
              }`}
              style={{ animationDelay: visible ? `${i * 0.12}s` : undefined }}
            >
              {/* Card */}
              <div className="bg-offwhite rounded-2xl p-8 md:p-7 h-full">
                <span className="font-display font-800 text-5xl md:text-6xl text-green-brand/15 block mb-4 leading-none">
                  {step.number}
                </span>
                <h3 className="font-display font-700 text-xl md:text-2xl tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-warm-gray text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full items-center justify-center border border-charcoal/[0.06]">
                  <svg className="w-3 h-3 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
