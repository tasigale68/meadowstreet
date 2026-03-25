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
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="Meadow Street"
              width={140}
              height={42}
              className="mb-5"
            />
            <p className="font-body text-white/35 leading-relaxed max-w-sm text-[15px]">
              Empowering your journey with personalised NDIS support across
              Melbourne, Victoria.
            </p>
            <a
              href="mailto:cooper@meadowstreet.com.au"
              className="inline-block mt-5 font-body text-white/50 hover:text-green-brand transition-colors text-sm"
            >
              cooper@meadowstreet.com.au
            </a>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h3 className="font-display font-700 text-sm mb-5 text-white/60 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-white/35 hover:text-white transition-colors text-[15px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NDIS */}
          <div className="md:col-span-4">
            <h3 className="font-display font-700 text-sm mb-5 text-white/60 uppercase tracking-wider">
              Accreditation
            </h3>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-green-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body font-semibold text-white/70 text-sm">NDIS Registered Provider</p>
                  <p className="font-body text-white/30 text-xs">Quality assured services</p>
                </div>
              </div>
              <p className="font-body text-white/25 text-xs leading-relaxed">
                Meadow Street is a registered NDIS provider delivering quality
                disability support services across Melbourne, Victoria.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/25 text-xs">
            &copy; 2026 Meadow Street. All rights reserved.
          </p>
          <p className="font-body text-white/15 text-xs">
            ABN and NDIS registration details available on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
