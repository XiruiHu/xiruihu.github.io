# CLAUDE.md — Frontend Website Rules

## Session Start
- **Invoke the `frontend-design` skill** only when writing new frontend code from scratch or making significant structural changes. Skip on small tweaks, copy edits, or follow-up fixes.

## Reference Images
- If provided: match layout, spacing, typography, and color exactly. Use placeholder content (`https://placehold.co/`, generic copy).
- If not provided: design from scratch with high craft (see guardrails below).

## Local Server
- Always serve on localhost — never screenshot a `file:///` URL.
- Start: `node serve.mjs` (project root → `http://localhost:3000`). Don't start a second instance if already running.

## Screenshot Workflow
- Puppeteer: `/usr/local/lib/node_modules/puppeteer/`. Run: `node screenshot.mjs http://localhost:3000 [label]`
- Screenshots save to `./temporary screenshots/screenshot-N[-label].png`. Read the PNG directly to analyze.
- **Take 1 screenshot after implementing changes.** Only take another if the user asks or a specific mismatch needs verification.
- When comparing: be specific ("heading is 32px, reference shows ~24px").

## Output Defaults
- Single `index.html`, all styles inline, unless told otherwise
- Tailwind via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Check `brand_assets/` before designing. Use any logos, colors, or style guides found there — no placeholders where real assets exist.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never same font for headings and body. Pair display/serif with clean sans. Tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Add gradient overlay (`bg-gradient-to-t from-black/60`) + color treatment with `mix-blend-multiply`.
- **Spacing:** Consistent spacing tokens — not random Tailwind steps.
- **Depth:** Layering system (base → elevated → floating), not a flat z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not improve a reference design — match it
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color