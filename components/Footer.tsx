import Image from "next/image";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      {/* Diagonal top edge */}
      <div className="absolute -top-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 80L1440 0V80H0Z" fill="#1A1A2E" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <Image
              src="/logo.png"
              alt="Meadow Street"
              width={180}
              height={54}
              className="mb-6"
            />
            <p className="font-satoshi text-white/60 leading-relaxed mb-6">
              Empowering your journey with personalised NDIS support across
              Melbourne.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-brand/20 flex items-center justify-center">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                href="mailto:cooper@meadowstreet.com.au"
                className="font-satoshi text-white/80 hover:text-green-brand transition-colors"
              >
                cooper@meadowstreet.com.au
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-clash font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-satoshi text-white/60 hover:text-green-brand transition-colors inline-flex items-center gap-2 group"
                  >
                    <svg
                      className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NDIS Badge + info */}
          <div>
            <h3 className="font-clash font-bold text-lg mb-6">Accreditation</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-brand to-purple-brand flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
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
                  <p className="font-clash font-bold text-white">
                    NDIS Registered Provider
                  </p>
                  <p className="font-satoshi text-white/50 text-sm">
                    Quality assured services
                  </p>
                </div>
              </div>
              <p className="font-satoshi text-white/40 text-sm leading-relaxed">
                Meadow Street is a registered NDIS provider delivering quality
                disability support services across Melbourne, Victoria.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-satoshi text-white/40 text-sm">
            &copy; 2026 Meadow Street. All rights reserved.
          </p>
          <p className="font-satoshi text-white/30 text-xs">
            ABN and NDIS registration details available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
