"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Supported Independent Living",
    tag: "SIL",
    description:
      "24/7 support in shared or individual living environments designed around your needs and lifestyle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Community Access",
    tag: null,
    description:
      "Get support to attend appointments, explore hobbies, visit friends, or just get out and about.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "In-Home Support",
    tag: null,
    description:
      "Respectful, reliable help with personal care, daily routines, and household tasks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Daily Living & Life Skills",
    tag: null,
    description:
      "Build confidence and independence: from travel training and budgeting to cooking and self care.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function useInView(threshold = 0.12) {
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

export default function Services() {
  const { ref, visible } = useInView();

  return (
    <section id="services" className="relative py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <div>
            <span className="font-body font-semibold text-green-brand text-xs tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="font-display font-700 text-4xl md:text-5xl lg:text-[3.5rem] mt-3 tracking-tight leading-[1.08]">
              Our Services
            </h2>
          </div>
          <p className="font-body text-warm-gray text-base md:text-lg max-w-md leading-relaxed">
            Tailored NDIS support that puts you in control of your life, your goals, and your choices.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl border border-charcoal/[0.06] p-7 md:p-8
                hover:border-green-brand/25 hover:bg-green-brand/[0.02]
                transition-all duration-300
                ${visible ? "animate-[fade-up_0.5s_ease-out_both]" : "opacity-0"}
              `}
              style={{ animationDelay: visible ? `${i * 0.08}s` : undefined }}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center flex-shrink-0 text-green-brand group-hover:bg-green-brand group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-700 text-lg md:text-xl tracking-tight">
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span className="bg-green-brand/10 text-green-brand text-[11px] font-body font-semibold px-2.5 py-0.5 rounded-md">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-warm-gray text-[15px] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
