export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-light via-offwhite to-purple-light" />

      {/* Decorative floating shapes */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-green-brand/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-purple-brand/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-40">
        <div className="max-w-3xl">
          <p className="font-satoshi font-semibold text-purple-brand text-base md:text-lg mb-4 tracking-widest uppercase animate-[fade-in_0.6s_ease-out]">
            NDIS Provider &bull; Melbourne
          </p>
          <h1 className="font-clash text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 animate-[fade-in_0.8s_ease-out_0.1s_both]">
            Empowering{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              your journey
            </span>
          </h1>
          <p className="font-satoshi text-lg sm:text-xl md:text-2xl text-charcoal/70 mb-12 max-w-2xl leading-relaxed animate-[fade-in_0.8s_ease-out_0.3s_both]">
            Supported Independent Living, Community Access, and personalised
            support built around your goals and choices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-[fade-in_0.8s_ease-out_0.5s_both]">
            <a
              href="#services"
              className="inline-flex items-center justify-center bg-green-brand text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-green-dark hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            >
              Our Services
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border-2 border-purple-brand text-purple-brand font-semibold px-8 py-4 rounded-full text-lg hover:bg-purple-brand hover:text-white hover:shadow-xl transition-all duration-200"
            >
              Refer a Participant
            </a>
          </div>
        </div>
      </div>

      {/* Diagonal bottom divider */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 120L1440 0V120H0Z" fill="#F9F7F3" />
        </svg>
      </div>
    </section>
  );
}
