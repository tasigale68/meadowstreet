# Meadow Street Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bold, modern marketing website for Meadow Street (NDIS provider) with a Supabase-backed referral form.

**Architecture:** Next.js 15 App Router single-page site with 7 sections. Server-side API route handles referral form submissions to Supabase. Static generation for all marketing content, SEO baked in from the start.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Supabase, Vercel, Clash Display + Satoshi fonts

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `.env.local`, `.gitignore`
- Copy: logo from `/mnt/c/Users/tasig/OneDrive/Desktop/Meadow Street png (white)[1].png` → `public/logo.png`

**Step 1: Create Next.js project**

Run:
```bash
cd ~/meadowstreet
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

If prompted about overwriting existing files, accept (only docs/ exists).

**Step 2: Install dependencies**

Run:
```bash
cd ~/meadowstreet
npm install @supabase/supabase-js
```

**Step 3: Copy logo to public**

Run:
```bash
cp "/mnt/c/Users/tasig/OneDrive/Desktop/Meadow Street png (white)[1].png" ~/meadowstreet/public/logo.png
```

**Step 4: Set up environment file**

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<to be set after Supabase project creation>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<to be set after Supabase project creation>
```

**Step 5: Set up Tailwind with brand tokens**

Replace `app/globals.css` with:
```css
@import "tailwindcss";

@theme {
  --color-green-brand: #1B6B1B;
  --color-green-light: #E8F5E8;
  --color-green-dark: #145214;
  --color-purple-brand: #5B2D8E;
  --color-purple-light: #F0E8F7;
  --color-purple-dark: #3D1E5F;
  --color-offwhite: #F9F7F3;
  --color-charcoal: #1A1A2E;
  --font-clash: 'Clash Display', sans-serif;
  --font-satoshi: 'Satoshi', sans-serif;
}
```

**Step 6: Set up root layout with fonts**

Replace `app/layout.tsx` with:
```tsx
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
```

**Step 7: Create placeholder page**

Replace `app/page.tsx` with:
```tsx
export default function Home() {
  return (
    <main>
      <h1 className="font-clash text-4xl font-bold text-green-brand p-8">
        Meadow Street — Coming Soon
      </h1>
    </main>
  );
}
```

**Step 8: Verify dev server runs**

Run: `cd ~/meadowstreet && npm run dev`
Expected: Server starts on localhost:3000, page shows green "Meadow Street — Coming Soon"

**Step 9: Commit**

```bash
cd ~/meadowstreet
git add -A
git commit -m "feat: scaffold Next.js project with brand tokens and fonts"
```

---

### Task 2: Supabase Project & Referrals Table

**Files:**
- Create: `lib/supabase.ts`

**Step 1: Create Supabase project**

Use Supabase MCP tool to create project named "meadowstreet" in ap-southeast-2 (Sydney).

**Step 2: Create referrals table**

Run SQL via Supabase MCP:
```sql
CREATE TABLE referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name text NOT NULL,
  contact_email text,
  contact_phone text,
  ndis_number text,
  support_type text[] DEFAULT '{}',
  coordinator_name text,
  coordinator_email text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON referrals
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "No anonymous reads" ON referrals
  FOR SELECT TO anon
  USING (false);
```

**Step 3: Update .env.local with real keys**

Update `.env.local` with the project URL and anon key from the new Supabase project.

**Step 4: Create Supabase client**

Create `lib/supabase.ts`:
```tsx
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Step 5: Commit**

```bash
cd ~/meadowstreet
git add lib/supabase.ts
git commit -m "feat: add Supabase client and referrals table"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Navbar**

Create `components/Navbar.tsx`:
```tsx
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Meadow Street" width={160} height={48} priority />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-satoshi font-medium text-charcoal hover:text-green-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-green-brand to-purple-brand text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            Refer a Participant
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-medium text-charcoal hover:text-green-brand"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block text-center bg-gradient-to-r from-green-brand to-purple-brand text-white font-semibold px-6 py-2.5 rounded-full"
            onClick={() => setMobileOpen(false)}
          >
            Refer a Participant
          </a>
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Add Navbar to page**

Update `app/page.tsx` to import and render `<Navbar />` at top.

**Step 3: Verify in browser**

Run dev server, check sticky nav, scroll behaviour, mobile menu toggle.

**Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: add sticky Navbar with mobile menu"
```

---

### Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Hero**

Create `components/Hero.tsx`:
```tsx
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Diagonal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-light via-offwhite to-purple-light" />

      {/* Decorative diagonal */}
      <div className="absolute -bottom-20 left-0 right-0 h-40 bg-offwhite transform -skew-y-3" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          <p className="font-satoshi font-semibold text-purple-brand text-lg mb-4 tracking-wide uppercase animate-fade-in">
            NDIS Provider — Melbourne
          </p>
          <h1 className="font-clash text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Empowering{" "}
            <span className="bg-gradient-to-r from-green-brand to-purple-brand bg-clip-text text-transparent">
              your journey
            </span>
          </h1>
          <p className="font-satoshi text-xl md:text-2xl text-charcoal/70 mb-10 max-w-2xl leading-relaxed">
            Supported Independent Living, Community Access, and personalised
            support — built around your goals and choices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center bg-green-brand text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-green-dark hover:shadow-xl hover:scale-105 transition-all"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border-2 border-purple-brand text-purple-brand font-semibold px-8 py-4 rounded-full text-lg hover:bg-purple-brand hover:text-white hover:shadow-xl transition-all"
            >
              Refer a Participant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Hero to page, update page.tsx to render Hero below Navbar**

**Step 3: Verify — large hero, gradient text, two CTAs, diagonal divider**

**Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with gradient text and diagonal divider"
```

---

### Task 5: Services Section

**Files:**
- Create: `components/Services.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Services**

Create `components/Services.tsx` with 4 service cards:
1. Supported Independent Living (SIL) — "24/7 support in shared or individual living environments designed around your needs."
2. Community Access — "Get support to attend appointments, explore hobbies, visit friends, or just get out and about."
3. In-Home Support — "Respectful, reliable help with personal care, daily routines, and household tasks."
4. Daily Living & Life Skills — "Build confidence and independence — from travel training and budgeting to cooking and self-care."

Each card should have:
- SVG icon (house, people, heart, star)
- Bold heading in Clash Display
- Description text
- Green left border accent
- Hover: lift with shadow + subtle purple border glow

**Step 2: Add to page.tsx**

**Step 3: Verify 4 cards in responsive grid (1 col mobile, 2 col tablet, 4 col desktop)**

**Step 4: Commit**

```bash
git add components/Services.tsx app/page.tsx
git commit -m "feat: add Services section with 4 animated cards"
```

---

### Task 6: About Section

**Files:**
- Create: `components/About.tsx`
- Modify: `app/page.tsx`

**Step 1: Create About**

Create `components/About.tsx` — split layout:
- Left: heading "Why Meadow Street?", body text about lived experience, tailored support, genuine care. Highlight bullet: "Monthly reports for Support Coordinators — WINS, CHALLENGES, and BARRIERS"
- Right: placeholder image area (gradient box with icon) — to be replaced with real photo later
- Diagonal top divider matching hero bottom

**Step 2: Add to page.tsx**

**Step 3: Verify split layout on desktop, stacked on mobile**

**Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section with split layout"
```

---

### Task 7: How It Works Section

**Files:**
- Create: `components/HowItWorks.tsx`
- Modify: `app/page.tsx`

**Step 1: Create HowItWorks**

Create `components/HowItWorks.tsx` — 3-step horizontal flow:
1. **Referral** — "Submit a referral or get in touch — we'll respond within 24 hours"
2. **Planning** — "We meet you, understand your goals, and build a tailored support plan"
3. **Support Starts** — "Your matched support team begins — flexible, responsive, and person-centred"

Connected by a dashed line/arrow between steps. Each step has a numbered circle (1, 2, 3) in green-to-purple gradient.

**Step 2: Add to page.tsx**

**Step 3: Verify 3 steps, responsive (horizontal desktop, vertical mobile)**

**Step 4: Commit**

```bash
git add components/HowItWorks.tsx app/page.tsx
git commit -m "feat: add How It Works 3-step section"
```

---

### Task 8: Service Area Section

**Files:**
- Create: `components/ServiceArea.tsx`
- Modify: `app/page.tsx`

**Step 1: Create ServiceArea**

Create `components/ServiceArea.tsx`:
- Heading: "Proudly Supporting Melbourne"
- Subtext: "Meadow Street provides NDIS services across Melbourne and surrounding areas"
- Decorative SVG map pin / location graphic
- Green-tinted background section with grain texture

**Step 2: Add to page.tsx**

**Step 3: Verify section renders with location emphasis**

**Step 4: Commit**

```bash
git add components/ServiceArea.tsx app/page.tsx
git commit -m "feat: add Service Area section"
```

---

### Task 9: Referral Form & API Route

**Files:**
- Create: `components/ReferralForm.tsx`
- Create: `app/api/referral/route.ts`
- Modify: `app/page.tsx`

**Step 1: Create API route**

Create `app/api/referral/route.ts`:
```tsx
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const body = await request.json();

  const { error } = await supabase.from("referrals").insert({
    participant_name: body.participant_name,
    contact_email: body.contact_email,
    contact_phone: body.contact_phone,
    ndis_number: body.ndis_number,
    support_type: body.support_type,
    coordinator_name: body.coordinator_name,
    coordinator_email: body.coordinator_email,
    message: body.message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

**Step 2: Create ReferralForm component**

Create `components/ReferralForm.tsx` — client component with:
- Fields: participant name*, email, phone, NDIS number, support type (multi-select checkboxes: SIL, Community Access, In-Home Support, Daily Living), coordinator name, coordinator email, message
- Submit button with gradient, loading state, success/error feedback
- Form validation (participant name required)
- POST to `/api/referral`

**Step 3: Add to page.tsx with id="contact"**

**Step 4: Test form submission — verify row appears in Supabase**

**Step 5: Commit**

```bash
git add components/ReferralForm.tsx app/api/referral/route.ts app/page.tsx
git commit -m "feat: add referral form with Supabase integration"
```

---

### Task 10: Footer

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Step 1: Create Footer**

Create `components/Footer.tsx`:
- Dark charcoal background (`#1A1A2E`)
- Logo (white version), contact email
- Quick links: Services, About, How It Works, Contact
- "NDIS Registered Provider" text badge
- Copyright: "© 2026 Meadow Street. All rights reserved."
- Diagonal top edge (inverted skew)

**Step 2: Add to page.tsx as last element**

**Step 3: Verify dark footer with all links**

**Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer with dark theme and quick links"
```

---

### Task 11: SEO Assets

**Files:**
- Create: `public/robots.txt`
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx` (add JSON-LD)

**Step 1: Create robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.meadowstreet.com.au/sitemap.xml
```

**Step 2: Create dynamic sitemap**

Create `app/sitemap.ts`:
```tsx
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.meadowstreet.com.au",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

**Step 3: Add JSON-LD to layout**

Add Organization + LocalBusiness JSON-LD script tags to layout.tsx `<head>`:
- Organization: Meadow Street, meadowstreet.com.au, logo
- LocalBusiness: NDIS provider, Melbourne VIC, contact email

**Step 4: Verify robots.txt at /robots.txt, sitemap at /sitemap.xml**

**Step 5: Commit**

```bash
git add public/robots.txt app/sitemap.ts app/layout.tsx
git commit -m "feat: add SEO — robots.txt, sitemap, JSON-LD schemas"
```

---

### Task 12: Animations & Polish

**Files:**
- Modify: `app/globals.css`
- Modify: multiple components

**Step 1: Add CSS animations**

Add to `globals.css`:
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Step 2: Add intersection observer for scroll-triggered animations**

Create a simple `useInView` hook or use CSS `animation-timeline: view()` for scroll-triggered reveals on Services cards, About section, How It Works steps.

**Step 3: Test all animations — hero text reveal, scroll reveals, hover effects**

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add scroll animations and visual polish"
```

---

### Task 13: GitHub & Vercel Deployment

**Step 1: Create GitHub repo**

```bash
cd ~/meadowstreet
gh repo create tasigale68/meadowstreet --public --source=. --remote=origin --push
```

**Step 2: Deploy to Vercel**

```bash
npx vercel --yes
npx vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Step 3: Verify live site loads at Vercel preview URL**

**Step 4: Commit any Vercel config changes**

```bash
git add -A
git commit -m "chore: deploy to Vercel"
```

---

### Task 14: DNS Configuration

**Step 1: Configure Crazy Domains DNS**

Add CNAME record:
- Host: `www`
- Points to: `cname.vercel-dns.com`

Add A record for apex (`meadowstreet.com.au`):
- Points to: `76.76.21.21` (Vercel)

**Step 2: Add domain in Vercel**

```bash
npx vercel domains add meadowstreet.com.au
npx vercel domains add www.meadowstreet.com.au
```

**Step 3: Verify SSL certificate provisioned and site loads at www.meadowstreet.com.au**

---

## Summary

| Task | Component | Depends On |
|------|-----------|------------|
| 1 | Project Scaffolding | — |
| 2 | Supabase Setup | — |
| 3 | Navbar | 1 |
| 4 | Hero | 1 |
| 5 | Services | 1 |
| 6 | About | 1 |
| 7 | How It Works | 1 |
| 8 | Service Area | 1 |
| 9 | Referral Form | 1, 2 |
| 10 | Footer | 1 |
| 11 | SEO Assets | 1 |
| 12 | Animations & Polish | 3–11 |
| 13 | GitHub & Vercel Deploy | 12 |
| 14 | DNS Configuration | 13 |

Tasks 1 & 2 can run in parallel. Tasks 3–11 can run in parallel after Task 1. Task 12 after all sections done. Tasks 13–14 sequential at the end.
