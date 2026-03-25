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

const values = [
  { label: "Person centred approach", icon: "01" },
  { label: "Culturally safe support", icon: "02" },
  { label: "Flexible scheduling", icon: "03" },
  { label: "Experienced team", icon: "04" },
];

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="relative py-24 md:py-32 bg-offwhite overflow-hidden">
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start"
      >
        {/* Left column */}
        <div className={visible ? "animate-[fade-up_0.6s_ease-out_both]" : "opacity-0"}>
          <span className="font-body font-semibold text-purple-brand text-xs tracking-widest uppercase">
            About Us
          </span>
          <h2 className="font-display font-700 text-4xl md:text-5xl mt-3 tracking-tight leading-[1.08]">
            Why Meadow Street?
          </h2>

          <div className="space-y-4 font-body text-warm-gray text-[16px] leading-[1.7] mt-7">
            <p>
              We believe great support starts with genuine connection. Our team
              brings lived experience, cultural understanding, and a real
              commitment to helping participants thrive on their own terms.
            </p>
            <p>
              Every support plan is built around you: your goals, your
              preferences, your pace. We do not believe in one size fits all
              because your life is not one size fits all.
            </p>
          </div>

          {/* Value props grid */}
          <div className="grid grid-cols-2 gap-3 mt-10">
            {values.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-charcoal/[0.05]"
              >
                <span className="font-display font-700 text-green-brand text-sm">
                  {item.icon}
                </span>
                <span className="font-body font-medium text-charcoal text-[14px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className={visible ? "animate-[fade-up_0.6s_ease-out_0.12s_both]" : "opacity-0"}>
          {/* SC Reports card — prominent */}
          <div className="bg-green-brand rounded-2xl p-8 md:p-10 text-white mb-5">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-display font-700 text-2xl mb-3 tracking-tight">
              Monthly Reports for Support Coordinators
            </h3>
            <p className="font-body text-white/70 leading-relaxed">
              Detailed updates covering WINS, CHALLENGES, and BARRIERS so
              coordinators always know how participants are progressing.
            </p>
          </div>

          {/* Team photo placeholder */}
          <div className="aspect-[16/9] rounded-2xl bg-white border border-charcoal/[0.06] overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-charcoal/[0.03] flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-charcoal/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="font-body text-charcoal/25 text-sm font-medium">
                Team Photo Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
