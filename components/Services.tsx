"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Supported Independent Living",
    subtitle: "SIL",
    description:
      "24/7 support in shared or individual living environments designed around your needs.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M6 22L24 8L42 22V40C42 41.1 41.1 42 40 42H8C6.9 42 6 41.1 6 40V22Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 42V26H30V42"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Community Access",
    subtitle: "",
    description:
      "Get support to attend appointments, explore hobbies, visit friends, or just get out and about.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="32" cy="16" r="5" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="32" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M19 20L22 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 20L26 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19.5 32H28.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "In-Home Support",
    subtitle: "",
    description:
      "Respectful, reliable help with personal care, daily routines, and household tasks.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M24 42C24 42 6 32 6 18C6 14.6863 7.31696 11.5086 9.66117 9.16441C12.0054 6.82017 15.183 5.50317 18.4967 5.50317C21.0138 5.50317 23.4341 6.33717 24 8.50317C24.5659 6.33717 26.9862 5.50317 29.5033 5.50317C32.817 5.50317 35.9946 6.82017 38.3388 9.16441C40.683 11.5086 42 14.6863 42 18C42 32 24 42 24 42Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Daily Living & Life Skills",
    subtitle: "",
    description:
      "Build confidence and independence: from travel training and budgeting to cooking and self care.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path
          d="M24 4L29.09 16.26L42 18.27L32 28.14L34.18 42L24 36.27L13.82 42L16 28.14L6 18.27L18.91 16.26L24 4Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
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

export default function Services() {
  const { ref, visible } = useInView();

  return (
    <section id="services" className="relative py-24 md:py-32 bg-offwhite">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-satoshi font-semibold text-green-brand text-sm tracking-widest uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="font-satoshi text-lg text-charcoal/60 max-w-2xl mx-auto">
            Tailored NDIS support that puts you in control of your life, your
            goals, and your choices.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative bg-white rounded-2xl p-8 border-l-4 border-green-brand shadow-sm
                hover:shadow-xl hover:-translate-y-2 hover:border-purple-brand
                transition-all duration-300 ease-out
                ${visible ? "animate-[slide-up_0.6s_ease-out_both]" : "opacity-0"}
              `}
              style={{ animationDelay: visible ? `${i * 0.12}s` : undefined }}
            >
              <div className="text-green-brand group-hover:text-purple-brand transition-colors duration-300 mb-6">
                {service.icon}
              </div>
              {service.subtitle && (
                <span className="inline-block bg-green-light text-green-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {service.subtitle}
                </span>
              )}
              <h3 className="font-clash text-xl font-bold mb-3 group-hover:text-purple-brand transition-colors">
                {service.title}
              </h3>
              <p className="font-satoshi text-charcoal/60 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
