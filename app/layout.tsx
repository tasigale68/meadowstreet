import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meadow Street | Empowering Your Journey | NDIS Provider Melbourne",
  description:
    "Meadow Street provides Supported Independent Living (SIL), Community Access, In-Home Support and Daily Living services across Melbourne. NDIS registered provider.",
  metadataBase: new URL("https://www.meadowstreet.com.au"),
  openGraph: {
    title: "Meadow Street | Empowering Your Journey",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Meadow Street",
  url: "https://www.meadowstreet.com.au",
  logo: "https://www.meadowstreet.com.au/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "cooper@meadowstreet.com.au",
    contactType: "customer service",
    areaServed: "AU",
    availableLanguage: "English",
  },
  sameAs: [],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Meadow Street",
  description:
    "NDIS registered provider offering Supported Independent Living (SIL), Community Access, In-Home Support and Daily Living services across Melbourne.",
  url: "https://www.meadowstreet.com.au",
  email: "cooper@meadowstreet.com.au",
  image: "https://www.meadowstreet.com.au/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: {
    "@type": "City",
    name: "Melbourne",
    "@id": "https://www.wikidata.org/wiki/Q3141",
  },
  priceRange: "NDIS Funded",
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
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="font-satoshi bg-offwhite text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
