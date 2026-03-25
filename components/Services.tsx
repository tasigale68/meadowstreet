"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Supported Independent Living",
    tag: "SIL",
    description:
      "24/7 support in shared or individual living environments designed around your needs and lifestyle.",
    color: "bg-green-light",
    accent: "text-green-brand",
  },
  {
    title: "Community Access",
    tag: null,
    description:
      "Get support to attend appointments, explore hobbies, visit friends, or just get out and about.",
    color: "bg-purple-light",
    accent: "text-purple-brand",
  },
  {
    title: "In-Home Support",
    tag: null,
    description:
      "Respectful, reliable help with personal care, daily routines, and household tasks.",
    color: "bg-green-light",
    accent: "text-green-brand",
  },
  {
    title: "Daily Living & Life Skills",
    tag: null,
    description:
      "Build confidence and independence: from travel training and budgeting to cooking and self care.",
    color: "bg-purple-light",
    accent: "text-purple-brand",
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
    <section id="services" className="relative py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header — left aligned */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className="font-sans font-semibold text-green-brand text-sm tracking-wide uppercase">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.1]">
            Support tailored to{" "}
            <em className="italic text-green-brand">your life</em>
          </h2>
          <p className="font-sans text-warm-gray text-lg mt-5 leading-relaxed">
            Personalised NDIS support that puts you in control of your goals and choices.
          </p>
        </div>

        {/* Cards — 2x2 grid with alternating color accents */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl p-8 md:p-10 border border-charcoal/[0.06] bg-cream/50
                hover:border-charcoal/[0.12] hover:shadow-lg
                transition-all duration-300 ease-out
                ${visible ? "animate-[fade-up_0.5s_ease-out_both]" : "opacity-0"}
              `}
              style={{ animationDelay: visible ? `${i * 0.1}s` : undefined }}
            >
              {/* Color accent dot */}
              <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                <span className={`font-sans font-bold text-sm ${service.accent}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {service.tag && (
                <span className={`inline-block ${service.color} ${service.accent} text-xs font-semibold px-3 py-1 rounded-md mb-3`}>
                  {service.tag}
                </span>
              )}

              <h3 className="font-serif text-2xl md:text-[1.7rem] leading-tight mb-3 group-hover:text-green-brand transition-colors duration-200">
                {service.title}
              </h3>
              <p className="font-sans text-warm-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
