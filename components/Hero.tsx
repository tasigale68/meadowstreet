"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-cream">
      {/* Soft radial glow */}
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-green-light/40 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-purple-light/30 rounded-full blur-[100px] opacity-50" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-20 md:pb-28 w-full">
        <div className="max-w-4xl">
          <div className="animate-[fade-up_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2 bg-green-light/60 text-green-brand font-sans font-semibold text-sm px-4 py-2 rounded-lg mb-8">
              <span className="w-2 h-2 rounded-full bg-green-brand" />
              NDIS Registered Provider &bull; Melbourne
            </div>
          </div>

          <h1 className="animate-[fade-up_0.8s_ease-out_0.1s_both]">
            <span className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] block text-charcoal">
              Empowering
            </span>
            <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] block text-green-brand mt-1">
              your journey
            </span>
          </h1>

          <p className="font-sans text-lg md:text-xl text-warm-gray mt-8 md:mt-10 max-w-xl leading-relaxed animate-[fade-up_0.8s_ease-out_0.3s_both]">
            Supported Independent Living, Community Access, and personalised
            support built around your goals and choices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 animate-[fade-up_0.8s_ease-out_0.45s_both]">
            <a
              href="#services"
              className="inline-flex items-center justify-center bg-green-brand text-white font-sans font-semibold px-7 py-3.5 rounded-xl text-base hover:bg-green-dark transition-colors duration-200 group"
            >
              Our Services
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-charcoal/5 text-charcoal font-sans font-semibold px-7 py-3.5 rounded-xl text-base hover:bg-charcoal/10 transition-colors duration-200"
            >
              Refer a Participant
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-8 right-8 flex-col items-center gap-2 text-charcoal/30 animate-[fade-in_1s_ease-out_1s_both]">
          <span className="font-sans text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div className="w-px h-12 bg-charcoal/20 relative overflow-hidden">
            <div className="w-full h-4 bg-green-brand/40 animate-[scroll-line_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
