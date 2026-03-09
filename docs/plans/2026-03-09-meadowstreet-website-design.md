# Meadow Street — Marketing Website Design

**Date:** 2026-03-09
**Client:** Meadow Street (NDIS Provider — SIL & Community Participation)
**Domain:** meadowstreet.com.au (Crazy Domains)
**Contact:** cooper@meadowstreet.com.au

## Overview

Marketing website for Meadow Street, a Melbourne-based NDIS provider specialising in Supported Independent Living (SIL) and Community Access. Replaces current basic site and migrates referral intake from Airtable to Supabase. Built on a stack that will grow into a full client/staff portal using the Amaiya Support framework.

## Aesthetic Direction

### Brand Colours
- Primary Green: `#1B6B1B` (deep forest green)
- Accent Purple: `#5B2D8E` (rich violet)
- Off-white background: `#F9F7F3`
- Charcoal text: `#1A1A2E`
- Soft green tint: `#E8F5E8`

### Typography
- Headings: **Clash Display** (Fontshare, free commercial)
- Body: **Satoshi** (Fontshare, free commercial)

### Visual Style
- Bold & modern — confident, community-driven, not clinical
- Diagonal section dividers, overlapping elements
- Green-to-purple gradient accents on CTAs
- Large hero with animated text reveal
- Card-based services with hover lift effects
- Subtle grain texture on backgrounds
- Scroll-triggered animations

## Site Structure (Single Page)

### Navigation
Sticky top nav: Logo | Services | About | Contact | **Refer a Participant** (CTA button)

### Sections
1. **Hero** — Full-width, "Empowering your journey", SIL & community support in Melbourne, dual CTAs
2. **Services** — 4 cards: SIL, Community Access, In-Home Support, Daily Living & Life Skills
3. **About / Why Meadow Street** — Split layout, lived experience, tailored support, monthly SC reporting
4. **How It Works** — 3-step visual: Referral → Planning → Support Starts
5. **Service Area** — Melbourne & surrounds
6. **Contact / Referral Form** — Supabase-backed, replaces Airtable
7. **Footer** — Logo, email, quick links, NDIS badge area, copyright

## Technical Architecture

### Stack
- Next.js 15 (App Router, TypeScript, Tailwind CSS v4)
- Vercel (Sydney region, auto-deploy from GitHub)
- Supabase (ap-southeast-2, new project)
- GitHub: tasigale68/meadowstreet

### Project Structure
```
~/meadowstreet/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/referral/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── HowItWorks.tsx
│   ├── ServiceArea.tsx
│   ├── ReferralForm.tsx
│   └── Footer.tsx
├── lib/supabase.ts
├── public/
│   ├── logo.png
│   ├── robots.txt
│   └── sitemap.xml
├── .env.local
└── package.json
```

### Supabase — `referrals` Table
| Column | Type |
|---|---|
| id | uuid (PK) |
| participant_name | text |
| contact_email | text |
| contact_phone | text |
| ndis_number | text |
| support_type | text[] |
| coordinator_name | text |
| coordinator_email | text |
| message | text |
| status | text (default: 'new') |
| created_at | timestamptz |

### SEO
- Meta tags, Open Graph, JSON-LD (Organization + LocalBusiness)
- robots.txt, sitemap.xml
- Semantic HTML throughout

### DNS
- CNAME `www` → `cname.vercel-dns.com` on Crazy Domains

## Future Expansion
- Client portal (view plans, progress notes, schedules)
- Staff portal (rostering, timesheets, incident reports)
- Intake/referral management system
- All built on Amaiya Support framework when ready
