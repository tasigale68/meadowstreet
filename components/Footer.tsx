import Image from "next/image";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="Meadow Street"
              width={160}
              height={48}
              className="mb-6"
            />
            <p className="font-sans text-white/45 leading-relaxed max-w-sm">
              Empowering your journey with personalised NDIS support across
              Melbourne, Victoria.
            </p>
            <a
              href="mailto:cooper@meadowstreet.com.au"
              className="inline-flex items-center gap-3 mt-6 font-sans text-white/60 hover:text-green-brand transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-green-brand/20 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              cooper@meadowstreet.com.au
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-serif text-lg mb-6 text-white/80">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-[15px] text-white/40 hover:text-green-brand transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NDIS Badge */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-lg mb-6 text-white/80">
              Accreditation
            </h3>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-green-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-semibold text-white/80 text-sm">
                    NDIS Registered Provider
                  </p>
                  <p className="font-sans text-white/35 text-sm">
                    Quality assured services
                  </p>
                </div>
              </div>
              <p className="font-sans text-white/30 text-sm leading-relaxed">
                Meadow Street is a registered NDIS provider delivering quality
                disability support services across Melbourne, Victoria.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-white/30 text-sm">
            &copy; 2026 Meadow Street. All rights reserved.
          </p>
          <p className="font-sans text-white/20 text-xs">
            ABN and NDIS registration details available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
