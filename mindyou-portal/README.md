# Mind You — Portal (Next.js)

Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion rebuild of the Mind You
login/activation flow.

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** — theme tokens live in `app/globals.css` under `@theme`, no `tailwind.config.js` needed
- **Framer Motion** for all transitions/interactions
- **next/font/google** for Inter, Inter Tight, and SUSE (self-hosted at build time, no runtime Google Fonts request)
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

> The build environment used to produce this project could not reach
> `fonts.googleapis.com` (sandboxed network), so the font fetch step wasn't
> exercised end-to-end here. `npm run build` was verified successfully with a
> temporary system-font fallback, and the `next/font/google` imports were
> restored afterward — this is standard Next.js and will "just work" the
> moment you build with normal internet access. If you ever want to remove
> the external font fetch entirely, swap the `next/font/google` imports in
> `app/layout.tsx` for `next/font/local` with downloaded `.woff2` files.

## Structure

```
app/
  layout.tsx              — fonts, metadata, global providers
  globals.css             — Tailwind v4 theme tokens (colors, fonts, shadows, easing)
  page.tsx                — "/" — Account Type selector
  enterprise/…/page.tsx   — thin server wrappers (metadata) around client views
  personal/…/page.tsx
components/
  auth/
    auth-layout.tsx       — shared split-screen shell used by all form pages
    account-type-view.tsx
    login-view.tsx
    activate-view.tsx
    activation-sent-view.tsx
    resend-activation-view.tsx
    create-password-view.tsx
    forgot-password-view.tsx
  ui/
    button.tsx             — motion button w/ loading state, enterprise/personal accent
    text-field.tsx         — accessible input w/ label, hint/error, password toggle
    checkbox.tsx
lib/
  brand.ts                 — enterprise/personal accent + copy tokens
  utils.ts                 — `cn()` class merge helper
```

## Design notes

- **Mobile-first & responsive**: the image panel collapses below `lg`,
  touch targets are ≥44px, inputs are 16px-safe to avoid iOS auto-zoom.
- **Motion**: entrances use the strong ease-out curve `[0.23, 1, 0.32, 1]`
  from your original code; buttons use a spring (`stiffness: 420, damping: 28`)
  for press feedback. Everything respects `prefers-reduced-motion` via
  Framer Motion's `useReducedMotion()`.
- **Accessibility**: labeled inputs, `aria-pressed`/`aria-checked` on custom
  selectable cards, visible focus rings, error text tied to inputs via
  `aria-describedby`.
- Forms currently simulate submission with a short timeout — wire the
  `handleSubmit`/`handleActivate`/etc. functions in each view up to your
  real API.
