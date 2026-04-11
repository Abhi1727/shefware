import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getHomeBannerSlides,
  HOME_BANNER_AUTOPLAY_MS,
  HOME_BANNER_DEV_PLACEHOLDER,
  type HomeBannerSlide,
} from '../../config/homeBanners'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** CTA when there are no slides in production (config empty). Same outer frame as carousel. */
function ProductionEmptyBannerBody() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#00429d] via-[#0b50da] to-[#00429d] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Shefware</p>
        <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-white sm:text-2xl">
          Migration, backup & conversion tools for serious IT teams
        </p>
      </div>
      <Link
        to="/marketplace"
        className="inline-flex shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#00429d] shadow-lg transition hover:bg-[#f1f5f9]"
      >
        Browse marketplace
      </Link>
    </div>
  )
}

function SlideClickOverlay({ slide }: { slide: HomeBannerSlide }) {
  const href = slide.href
  if (!href) return null
  const className =
    'absolute inset-0 z-[4] block h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white'
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className} aria-label={slide.alt}>
        <span className="sr-only">{slide.alt}</span>
      </a>
    )
  }
  return (
    <Link to={href} className={className} aria-label={slide.alt}>
      <span className="sr-only">{slide.alt}</span>
    </Link>
  )
}

/**
 * Dedicated home promo region — full-width band with a single framed “billboard” container.
 * Use id `home-promo-banner` to target this block in Windsurf / devtools / E2E.
 */
export function HomePromoCarousel() {
  const slides = useMemo(() => getHomeBannerSlides(), [])
  const isDevPlaceholderOnly =
    import.meta.env.DEV &&
    slides.length === 1 &&
    slides[0]?.src === HOME_BANNER_DEV_PLACEHOLDER.src

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduce = prefersReducedMotion()

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const go = useCallback(
    (i: number) => {
      if (slides.length === 0) return
      setIndex(((i % slides.length) + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (slides.length <= 1 || reduce || paused) {
      clearTimer()
      return
    }
    clearTimer()
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, HOME_BANNER_AUTOPLAY_MS)
    return clearTimer
  }, [slides.length, reduce, paused, clearTimer])

  const current = slides[index]

  const slideInner =
    slides.length > 0 && current ? (
      <>
        <div className="relative aspect-[2.2/1] min-h-[200px] w-full overflow-hidden bg-white sm:min-h-[260px] sm:aspect-[2.4/1] lg:aspect-[2.5/1] lg:min-h-[300px]">
          {slides.map((s, i) => (
            <img
              key={s.src + i}
              src={s.src}
              alt={s.alt}
              className={[
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
                i === index ? 'z-[1] opacity-100' : 'z-0 opacity-0',
              ].join(' ')}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-transparent to-black/15"
            aria-hidden
          />
        </div>
        <SlideClickOverlay slide={current} />
      </>
    ) : null

  return (
    <section
      id="home-promo-banner"
      data-region="home-promo"
      className="border-b border-[#e1e7ef] bg-[#eef2f7]"
      aria-label="Home promotional banners"
    >
      <div className="mx-auto w-full max-w-[1280px] px-0">
        {isDevPlaceholderOnly ? (
          <p className="border-b border-amber-200/80 bg-amber-50 px-3 py-2 text-center text-[10px] leading-snug text-amber-900 sm:px-4 sm:text-xs">
            Dev: add images under{' '}
            <code className="rounded bg-white/90 px-1 py-0.5 text-[0.65rem] sm:text-xs">src/components/images</code> or
            set <code className="rounded bg-white/90 px-1 py-0.5 text-[0.65rem] sm:text-xs">HOME_BANNER_SLIDES</code>
          </p>
        ) : null}

        {/* Full-width within site max — no side gutters so art fills the content column */}
        <div
          className="relative w-full overflow-hidden bg-white sm:rounded-b-xl sm:shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_-8px_rgba(15,23,42,0.08)]"
          data-promo-viewport
        >
          {slides.length > 0 ? (
            <div
              className="relative"
              aria-roledescription="carousel"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slideInner}

              {slides.length > 1 ? (
                <div className="absolute bottom-3 left-0 right-0 z-[5] flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go(i)}
                      className={[
                        'h-2 rounded-full transition-all',
                        i === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80',
                      ].join(' ')}
                      aria-label={`Show banner ${i + 1}`}
                      aria-current={i === index}
                    />
                  ))}
                </div>
              ) : null}

              {slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    className="absolute left-3 top-1/2 z-[5] hidden -translate-y-1/2 rounded-full bg-black/45 p-2.5 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:block"
                    aria-label="Previous banner"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    className="absolute right-3 top-1/2 z-[5] hidden -translate-y-1/2 rounded-full bg-black/45 p-2.5 text-white shadow-md backdrop-blur-sm transition hover:bg-black/60 md:block"
                    aria-label="Next banner"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>
          ) : (
            <ProductionEmptyBannerBody />
          )}
        </div>
      </div>
    </section>
  )
}
