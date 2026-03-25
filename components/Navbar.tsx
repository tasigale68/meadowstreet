"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#" className="relative z-10">
          <Image
            src="/logo.png"
            alt="Meadow Street"
            width={145}
            height={44}
            priority
            className={`transition-all duration-400 ${scrolled ? "brightness-0" : ""}`}
          />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-charcoal/50 hover:text-charcoal px-4 py-2 rounded-lg hover:bg-charcoal/[0.04] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 bg-green-brand text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-dark transition-colors duration-200"
          >
            Refer a Participant
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-10 p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block w-full h-0.5 bg-charcoal transition-all duration-300 origin-left ${mobileOpen ? "rotate-45 w-[26px]" : ""}`} />
            <span className={`block w-full h-0.5 bg-charcoal transition-all duration-300 ${mobileOpen ? "opacity-0 -translate-x-2" : ""}`} />
            <span className={`block w-full h-0.5 bg-charcoal transition-all duration-300 origin-left ${mobileOpen ? "-rotate-45 w-[26px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-charcoal/5 px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-body font-medium text-charcoal/60 hover:text-charcoal py-3 text-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block text-center bg-green-brand text-white font-body font-semibold px-6 py-3.5 rounded-xl text-lg mt-4"
            onClick={() => setMobileOpen(false)}
          >
            Refer a Participant
          </a>
        </div>
      </div>
    </nav>
  );
}
