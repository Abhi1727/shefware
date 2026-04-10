/**
 * Hero promo / ad carousel — images live in `public/home-banners/` (no rebuild needed).
 * Add files there, then list them below. Paths are site-root URLs, e.g. `/home-banners/sale.jpg`.
 */
export type HomeBannerSlide = {
  src: string
  alt: string
  /** Optional: whole slide links here */
  href?: string
}

export const HOME_BANNER_SLIDES: HomeBannerSlide[] = [
  // Examples (add your files under frontend/public/home-banners/):
  // { src: '/home-banners/promo-1.jpg', alt: 'Product spotlight', href: '/marketplace' },
  // { src: '/home-banners/promo-2.webp', alt: 'Seasonal offer' },
]

export const HOME_BANNER_AUTOPLAY_MS = 5500
