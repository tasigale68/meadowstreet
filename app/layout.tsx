import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meadow Street — Empowering Your Journey | NDIS Provider Melbourne",
  description:
    "Meadow Street provides Supported Independent Living (SIL), Community Access, In-Home Support and Daily Living services across Melbourne. NDIS registered provider.",
  metadataBase: new URL("https://www.meadowstreet.com.au"),
  openGraph: {
    title: "Meadow Street — Empowering Your Journey",
    description:
      "NDIS Supported Independent Living & Community Access in Melbourne",
    url: "https://www.meadowstreet.com.au",
    siteName: "Meadow Street",
    locale: "en_AU",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.meadowstreet.com.au" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-satoshi bg-offwhite text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
