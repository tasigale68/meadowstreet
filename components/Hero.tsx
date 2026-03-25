"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background: split layout with green accent panel */}
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-green-brand hidden lg:block" />

      {/* Content grid */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="animate-[fade-up_0.7s_ease-out]">
              <div className="inline-flex items-center gap-2.5 bg-green-brand/8 border border-green-brand/15 text-green-brand font-body font-semibold text-xs tracking-wide uppercase px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-brand animate-pulse" />
                NDIS Registered Provider &bull; Melbourne
              </div>
            </div>

            <h1 className="font-display text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[5.2rem] font-800 leading-[1.02] tracking-tight animate-[fade-up_0.7s_ease-out_0.08s_both]">
              Empowering
              <br />
              <span className="text-green-brand">your journey</span>
            </h1>

            <p className="font-body text-warm-gray text-lg md:text-xl mt-7 max-w-lg leading-relaxed animate-[fade-up_0.7s_ease-out_0.2s_both]">
              Supported Independent Living, Community Access, and personalised
              support built around your goals and choices.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10 animate-[fade-up_0.7s_ease-out_0.32s_both]">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-green-brand text-white font-body font-semibold px-7 py-3.5 rounded-xl text-[15px] hover:bg-green-dark transition-all duration-200 group"
              >
                Our Services
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-charcoal text-white font-body font-semibold px-7 py-3.5 rounded-xl text-[15px] hover:bg-charcoal/85 transition-all duration-200"
              >
                Refer a Participant
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-charcoal/[0.06] animate-[fade-up_0.7s_ease-out_0.45s_both]">
              <div>
                <p className="font-display font-700 text-2xl text-charcoal">24hr</p>
                <p className="font-body text-warm-gray text-sm">Response time</p>
              </div>
              <div className="w-px h-10 bg-charcoal/10" />
              <div>
                <p className="font-display font-700 text-2xl text-charcoal">NDIS</p>
                <p className="font-body text-warm-gray text-sm">Registered</p>
              </div>
              <div className="w-px h-10 bg-charcoal/10" />
              <div>
                <p className="font-display font-700 text-2xl text-charcoal">Melbourne</p>
                <p className="font-body text-warm-gray text-sm">Wide coverage</p>
              </div>
            </div>
          </div>

          {/* Right panel: decorative content on green (desktop) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
            <div className="text-white/90 text-center px-8">
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="font-display font-700 text-3xl leading-tight mb-3">
                Person centred support
              </p>
              <p className="font-body text-white/60 text-base leading-relaxed max-w-xs mx-auto">
                Every plan is shaped by your goals, your preferences, and your pace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
