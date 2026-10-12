# Phaze AI website

Premium dark website for Phaze AI, an AI implementation partner. Includes automation, employee training, industries, company information and Topmate call booking. Animations stay enabled without a motion toggle.

## Local development

Requires Node.js 22.13 or later.

```sh
npm ci
npm run dev -- --port 5191
```

Open http://localhost:5191.

## Build

```sh
npm run build
```

The static website is generated in `dist/client`. Navigation uses normal links, so the exported pages work without a Node.js server. A static host must resolve extensionless paths such as `/how-we-work` to their `.html` files.

## Hostinger

`phaze-hostinger.zip` contains the ready-to-upload website, including `.htaccess` for clean page URLs. Extract its contents directly into your domain's `public_html` folder. The ZIP reflects the included source snapshot; rebuild and repackage it after future source edits.

## Editing

- Shared navigation and sections: `components/phaze.tsx`
- Homepage service cards: `components/experience.tsx`
- Hero: `components/premium-hero.tsx`
- Other pages and enquiry forms: `components/content-pages.tsx`
- Booking destination: `lib/booking.ts`
- Catalogue content: `lib/content.json`
- Component attribution: `COMPONENTS.md`

Call booking opens Topmate. Training and event forms prepare downloadable enquiries; they are not connected to an inbox. WhatsApp and some company details still have placeholders.

This commit replaces the previous website/demo files. Earlier versions remain available in Git history.
