# CineVista — Project Instructions

## Overview
Premium Sri Lankan cinema theater website for CineVista, Colombo.

## Tech Stack
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS v4

## Brand
- **Name:** CineVista
- **Tagline:** "Where Every Frame Feels Infinite"
- **Location:** Colombo, Sri Lanka
- **Colors:** Gold (#C9A84C), Cyan (#00D4FF), Dark BG (#0A0A0B)
- **Fonts:** Playfair Display (headings), Inter (body), Bebas Neue (display)

## Design Approach
- Mixed dark/light theme sections alternating throughout the page
- Dark hero → Light "Now Showing" → Dark "Coming Soon" → Light Showtimes/Pricing → Dark Loyalty/Footer
- Glassmorphism, gold gradients, neon glow effects
- Full Tailwind CSS v4 — no inline styles, no pure CSS where avoidable

## Rules
- Use Tailwind utility classes everywhere
- Keep CSS variables in globals.css @theme block
- Images use Next.js `<Image>` component with `unoptimized` for external URLs
- All animations via Tailwind or CSS keyframes in globals.css
- Mobile-first responsive design
