"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "1",
    title: "Referral",
    description:
      "Submit a referral or get in touch. We will respond within 24 hours.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Planning",
    description:
      "We meet you, understand your goals, and build a tailored support plan.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Support Starts",
    description:
      "Your matched support team begins: flexible, responsive, and person centred.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function useInView(threshold = 0.2) {
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
  const { ref, visible } = useInView(0.15);

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-satoshi font-semibold text-purple-brand text-sm tracking-widest uppercase mb-4">
            Getting Started
          </p>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="font-satoshi text-lg text-charcoal/60 max-w-2xl mx-auto">
            Three simple steps to get the support you need.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Dashed connecting line (desktop) */}
          <div className="hidden md:block absolute top-[72px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 border-t-2 border-dashed border-green-brand/30" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative flex flex-col items-center text-center ${
                  visible
                    ? "animate-[slide-up_0.6s_ease-out_both]"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: visible ? `${i * 0.2}s` : undefined,
                }}
              >
                {/* Dashed connecting line (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute top-[144px] left-1/2 w-0.5 h-12 border-l-2 border-dashed border-green-brand/30" />
                )}

                {/* Numbered circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-brand to-purple-brand flex items-center justify-center shadow-lg">
                    <span className="font-clash text-3xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  {/* Icon badge */}
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-green-brand">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-clash text-2xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="font-satoshi text-charcoal/60 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
