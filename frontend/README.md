# Shefware — frontend

Production marketing site and product catalog for [Shefware](https://shefware.com): React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router.

## Structure

| Path | Role |
|------|------|
| `src/config/site.ts` | Brand name, tagline, default meta copy |
| `src/data/products.ts` | Product catalog (slugs, pricing labels, live URLs) |
| `src/lib/routeMeta.ts` | Document titles per route |
| `src/lib/api.ts` | Backend API client (newsletter, etc.) |
| `src/layouts/RootLayout.tsx` | Shell: header, `<main>`, footer, page title |
| `src/components/layout/` | `SiteHeader`, `SiteFooter`, `BrandMark`, icons |
| `src/pages/` | Route screens (`HomePage`, `MarketplacePage`, services, …) |
| `src/components/home/` | Home-only blocks: promo carousel, logo marquee |
| `public/home-banners/` | Promo images; register in `homeBanners.ts`. Dev uses `placeholder.svg` when the list is empty. |

## Commands

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc + production bundle
npm run lint
npm run preview  # serve dist locally
```

## Environment

Optional: `VITE_API_BASE_URL` — override API origin for forms (see `src/lib/api.ts`).
