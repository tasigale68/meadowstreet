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
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Diagonal top divider */}
      <div className="absolute -top-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 0L1440 120V0H0Z" fill="#F9F7F3" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-green-light/50 via-white to-purple-light/30 absolute inset-0" />

      <div
        ref={ref}
        className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left: Text content */}
        <div
          className={`${
            visible ? "animate-[slide-up_0.7s_ease-out_both]" : "opacity-0"
          }`}
        >
          <p className="font-satoshi font-semibold text-purple-brand text-sm tracking-widest uppercase mb-4">
            About Us
          </p>
          <h2 className="font-clash text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              Meadow Street?
            </span>
          </h2>
          <div className="space-y-5 font-satoshi text-lg text-charcoal/70 leading-relaxed">
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

          {/* Highlight bullet */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-green-brand/20 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-brand to-purple-brand flex items-center justify-center">
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
                <h3 className="font-clash font-bold text-lg mb-1">
                  Monthly Reports for Support Coordinators
                </h3>
                <p className="font-satoshi text-charcoal/60">
                  Detailed updates covering WINS, CHALLENGES, and BARRIERS so
                  coordinators always know how participants are progressing.
                </p>
              </div>
            </div>
          </div>

          {/* Extra value props */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Person centred approach", icon: "✦" },
              { label: "Culturally safe support", icon: "✦" },
              { label: "Flexible scheduling", icon: "✦" },
              { label: "Experienced team", icon: "✦" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-green-brand font-bold">{item.icon}</span>
                <span className="font-satoshi font-medium text-charcoal/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Placeholder image area */}
        <div
          className={`${
            visible
              ? "animate-[slide-up_0.7s_ease-out_0.2s_both]"
              : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-green-brand/10 via-purple-brand/10 to-green-light overflow-hidden shadow-2xl">
              {/* Decorative content for placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-brand to-purple-brand flex items-center justify-center mb-6">
                  <svg
                    className="w-12 h-12 text-white"
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
                <p className="font-clash text-xl font-bold text-charcoal/40 text-center">
                  Team Photo Coming Soon
                </p>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-green-brand/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
