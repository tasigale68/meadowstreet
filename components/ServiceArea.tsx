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
    <section className="relative py-24 md:py-32 bg-green-brand overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 border border-white/[0.06] rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-white/[0.04] rounded-full" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-7xl px-6 lg:px-8 ${
          visible ? "animate-[fade-up_0.7s_ease-out_both]" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="font-body font-semibold text-white/50 text-xs tracking-widest uppercase">
              Service Area
            </span>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-white mt-3 tracking-tight leading-[1.08]">
              Proudly supporting Melbourne
            </h2>
            <p className="font-body text-white/55 text-lg mt-5 leading-relaxed max-w-md">
              Meadow Street provides NDIS services across Melbourne and surrounding
              areas. Wherever you are, we will come to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="bg-white/[0.08] border border-white/[0.1] text-white/70 font-body font-medium px-5 py-3 rounded-xl text-sm hover:bg-white/[0.15] hover:text-white transition-all duration-200 cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
