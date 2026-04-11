/**
 * Hero promo / ad carousel.
 *
 * **Primary:** Images under `src/components/images/` (see `homeBannerAssets.ts` in that folder) are
 * bundled by Vite and used as slides (sorted by leading number in the filename, then name).
 *
 * **Fallback:** If that folder has no matches, `HOME_BANNER_SLIDES` uses site-root URLs from
 * `public/home-banners/` (no rebuild to swap files, but changing this array needs a rebuild).
 *
 * If both are empty: **dev** shows a placeholder slide; **production** shows the CTA strip in the same frame.
 */
import { slidesFromComponentImagesFolder } from '../components/images/homeBannerAssets'

export type HomeBannerSlide = {
  src: string
  alt: string
  /** Optional: whole slide links here (path or https URL) */
  href?: string
}

function slidesFromComponentImages(): HomeBannerSlide[] {
  return slidesFromComponentImagesFolder()
}

export const HOME_BANNER_SLIDES: HomeBannerSlide[] = [
  // Used only when `src/components/images/` has no matching files. Example:
  // { src: '/home-banners/promo-1.jpg', alt: 'Product spotlight', href: '/marketplace' },
]

/** Shown in development when there are no real slides — defines the banner “slot” visually. */
export const HOME_BANNER_DEV_PLACEHOLDER: HomeBannerSlide = {
  src: '/home-banners/placeholder.svg',
  alt: 'Promo banner placeholder — add images to src/components/images or set HOME_BANNER_SLIDES',
}

export function getHomeBannerSlides(): HomeBannerSlide[] {
  const fromAssets = slidesFromComponentImages()
  if (fromAssets.length > 0) return fromAssets
  if (HOME_BANNER_SLIDES.length > 0) return HOME_BANNER_SLIDES
  if (import.meta.env.DEV) return [HOME_BANNER_DEV_PLACEHOLDER]
  return []
}

export const HOME_BANNER_AUTOPLAY_MS = 5500
