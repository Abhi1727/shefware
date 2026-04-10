import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_BANNER_AUTOPLAY_MS, HOME_BANNER_SLIDES, type HomeBannerSlide } from '../../config/homeBanners'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function DefaultPromoStrip() {
  return (
    <div className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#00429d] via-[#0b50da] to-[#00429d]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:py-10 sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Shefware</p>
          <p className="mt-1 font-[family-name:var(--font-heading)] text-lg font-bold text-white sm:text-xl">
            Migration, backup & conversion tools for serious IT teams
          </p>
        </div>
        <Link
          to="/marketplace"
          className="inline-flex shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#00429d] shadow-md transition hover:bg-[#f1f5f9]"
        >
          Browse marketplace
        </Link>
      </div>
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

export function HomePromoCarousel() {
  const slides = HOME_BANNER_SLIDES
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

  if (slides.length === 0) {
    return <DefaultPromoStrip />
  }

  const current = slides[index]!

  const slideInner = (
    <div className="relative aspect-[21/8] max-h-[min(320px,42vw)] w-full overflow-hidden bg-[#0f172a] sm:aspect-[21/7]">
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
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/50 via-transparent to-black/20"
        aria-hidden
      />
    </div>
  )

  return (
    <section
      className="border-b border-[#e2e8f0] bg-[#101828]"
      aria-roledescription="carousel"
      aria-label="Promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-[1280px]">
        {slideInner}
        <SlideClickOverlay slide={current} />

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
              className="absolute left-2 top-1/2 z-[5] hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 sm:block"
              aria-label="Previous banner"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-2 top-1/2 z-[5] hidden -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 sm:block"
              aria-label="Next banner"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        ) : null}
      </div>
    </section>
  )
}
