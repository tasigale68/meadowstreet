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

export default function ServiceArea() {
  const { ref, visible } = useInView();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Green tinted background with grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-light via-green-light/50 to-offwhite" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        ref={ref}
        className={`relative mx-auto max-w-7xl px-6 text-center ${
          visible ? "animate-[fade-in_0.8s_ease-out_both]" : "opacity-0"
        }`}
      >
        {/* Location pin graphic */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-brand to-green-dark flex items-center justify-center shadow-2xl">
              <svg
                className="w-14 h-14 text-white"
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
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-green-brand/30 animate-ping" />
            <div className="absolute -inset-4 rounded-full border border-green-brand/10 animate-pulse" />
          </div>
        </div>

        <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Proudly Supporting{" "}
          <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
            Melbourne
          </span>
        </h2>
        <p className="font-satoshi text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Meadow Street provides NDIS services across Melbourne and surrounding
          areas. Wherever you are, we will come to you.
        </p>

        {/* Area badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Northern Suburbs",
            "Western Suburbs",
            "Eastern Suburbs",
            "South East",
            "CBD & Inner City",
            "Greater Melbourne",
          ].map((area) => (
            <span
              key={area}
              className="bg-white/80 backdrop-blur-sm border border-green-brand/20 text-charcoal/70 font-satoshi font-medium px-5 py-2.5 rounded-full text-sm shadow-sm hover:bg-green-brand hover:text-white hover:border-green-brand transition-all duration-200 cursor-default"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
