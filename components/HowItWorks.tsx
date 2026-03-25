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
    <section id="how-it-works" className="relative py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="font-sans font-semibold text-green-brand text-sm tracking-wide uppercase">
            Getting Started
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.1]">
            Three simple <em className="italic text-green-brand">steps</em>
          </h2>
          <p className="font-sans text-warm-gray text-lg mt-5 leading-relaxed">
            From first contact to ongoing support, we make the process straightforward.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.25rem] left-0 right-0 h-px bg-charcoal/[0.08]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative ${
                  visible
                    ? "animate-[fade-up_0.5s_ease-out_both]"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: visible ? `${i * 0.15}s` : undefined,
                }}
              >
                {/* Number */}
                <div className="relative z-10 mb-8">
                  <div className="w-[6.5rem] h-[6.5rem] rounded-2xl bg-cream border border-charcoal/[0.06] flex items-center justify-center">
                    <span className="font-serif text-5xl text-green-brand">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-warm-gray leading-relaxed">
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
