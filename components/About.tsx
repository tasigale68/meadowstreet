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

export default function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" className="relative py-24 md:py-36 bg-green-light/30 overflow-hidden">
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left: Text content (7 cols) */}
        <div
          className={`lg:col-span-7 ${
            visible ? "animate-[fade-up_0.7s_ease-out_both]" : "opacity-0"
          }`}
        >
          <span className="font-sans font-semibold text-purple-brand text-sm tracking-wide uppercase">
            About Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 leading-[1.1]">
            Why <em className="italic text-green-brand">Meadow Street?</em>
          </h2>

          <div className="space-y-5 font-sans text-warm-gray text-lg leading-relaxed mt-8">
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

          {/* Monthly reports highlight */}
          <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-charcoal/[0.06]">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-brand flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">
                  Monthly Reports for Support Coordinators
                </h3>
                <p className="font-sans text-warm-gray leading-relaxed">
                  Detailed updates covering WINS, CHALLENGES, and BARRIERS so
                  coordinators always know how participants are progressing.
                </p>
              </div>
            </div>
          </div>

          {/* Value props */}
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
            {[
              "Person centred approach",
              "Culturally safe support",
              "Flexible scheduling",
              "Experienced team",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-green-brand/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-sans font-medium text-charcoal/80 text-[15px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image placeholder (5 cols) */}
        <div
          className={`lg:col-span-5 ${
            visible
              ? "animate-[fade-up_0.7s_ease-out_0.15s_both]"
              : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-b from-green-brand/8 to-purple-brand/8 border border-charcoal/[0.06] overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-green-brand/10 flex items-center justify-center mb-5">
                  <svg
                    className="w-10 h-10 text-green-brand/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <p className="font-serif text-lg italic text-charcoal/25 text-center">
                  Team Photo Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
