"use client";

import { useEffect, useRef, useState } from "react";

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

const areas = [
  "Northern Suburbs",
  "Western Suburbs",
  "Eastern Suburbs",
  "South East",
  "CBD & Inner City",
  "Greater Melbourne",
];

export default function ServiceArea() {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-24 md:py-36 bg-charcoal overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-brand/10 rounded-full blur-[120px]" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-7xl px-6 lg:px-8 text-center ${
          visible ? "animate-[fade-up_0.8s_ease-out_both]" : "opacity-0"
        }`}
      >
        {/* Location pin */}
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-green-brand/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-brand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
          Proudly supporting{" "}
          <em className="italic text-green-brand">Melbourne</em>
        </h2>
        <p className="font-sans text-white/50 text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          Meadow Street provides NDIS services across Melbourne and surrounding
          areas. Wherever you are, we will come to you.
        </p>

        {/* Area badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {areas.map((area) => (
            <span
              key={area}
              className="bg-white/[0.06] border border-white/[0.08] text-white/60 font-sans font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-green-brand/20 hover:text-green-brand hover:border-green-brand/30 transition-all duration-200 cursor-default"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
