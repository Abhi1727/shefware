import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const pillars = [
  {
    title: 'Built for IT reality',
    body: 'Cutovers, acquisitions, and helpdesk escalations rarely arrive with perfect data. Shefware is designed for partial OSTs, mixed tenants, and deadlines that do not move—so operators get tools that match the mess, not a marketing story.',
    icon: 'ops' as const,
  },
  {
    title: 'Clarity over magic',
    body: 'Every product page states scope, limits, and fit. When automation ends and judgment begins, we point clearly to services and custom pipelines so procurement and engineering read the same truth.',
    icon: 'clarity' as const,
  },
  {
    title: 'Security-minded defaults',
    body: 'Backups, conversions, and viewers are built with least surprise: visible progress, explicit paths for data handling, and workflows you can explain to security and compliance without hand-waving.',
    icon: 'shield' as const,
  },
  {
    title: 'Proof in production',
    body: 'We ship utilities people can try—like OST to PST on osttopst.us—before enterprise packaging. That keeps us honest about UX and performance instead of hiding behind slides.',
    icon: 'ship' as const,
  },
] as const

const audiences = [
  {
    title: 'IT & platform teams',
    body: 'Standardize mailbox moves, conversions, and backups with repeatable steps your L2/L3 can run and document.',
  },
  {
    title: 'MSPs & project offices',
    body: 'Deliver client migrations with clear tooling plus an escalation path when scope outgrows off-the-shelf software.',
  },
  {
    title: 'Risk & records',
    body: 'Support eDiscovery and retention with viewers and export paths designed for review, not casual browsing.',
  },
] as const

const commitments = [
  'No black-box “AI migration” claims—explicit capabilities per product.',
  'Catalog and marketplace stay aligned so marketing and engineering do not diverge.',
  'Services complement software when you need SLAs, runbooks, or custom integrations.',
] as const

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduce = typeof window !== 'undefined' && prefersReducedMotion()

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out motion-reduce:duration-0',
        inView || reduce ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      ].join(' ')}
      style={reduce ? undefined : { transitionDelay: inView ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

function CountUpStat({
  value,
  suffix = '',
  label,
  sub,
}: {
  value: number
  suffix?: string
  label: string
  sub: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [display, setDisplay] = useState(0)

  const run = useCallback(() => {
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    const duration = 1100
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setDisplay(Math.round(eased * value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])

  useEffect(() => {
    if (inView) run()
  }, [inView, run])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:hover:shadow-sm"
    >
      <p className="font-[family-name:var(--font-heading)] text-4xl font-extrabold tabular-nums text-[#00429d] sm:text-5xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 font-[family-name:var(--font-heading)] text-sm font-bold text-[#0f172a]">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#64748b]">{sub}</p>
    </div>
  )
}

function PillarIcon({ name }: { name: (typeof pillars)[number]['icon'] }) {
  const c = 'h-8 w-8 text-[#00429d]'
  if (name === 'ops') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 18h9.75M10.5 12h9.75M3.75 6h.007v.008H3.75V6zm0 6h.007v.008H3.75v-.008zm0 6h.007v.008H3.75v-.008z" />
      </svg>
    )
  }
  if (name === 'clarity') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m4.5 0a12.05 12.05 0 003.478-.397m-12 0V5.25A2.25 2.25 0 016.75 3h10.5a2.25 2.25 0 012.25 2.25V18m-12 0v.75a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-.75" />
      </svg>
    )
  }
  if (name === 'shield') {
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  }
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 5.84 2.18 2.18 0 01-2.12-2.12 6 6 0 015.84-5.84m4.24-4.24l-2.6 2.6m0 0L12 12m4.23-4.23L12 12" />
    </svg>
  )
}

export function WhyShefwarePage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Ambient motion (CSS) — subtle */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40 max-[forced-colors:active]:opacity-30"
        aria-hidden
      >
        <div className="why-page-blob-a absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#00429d]/20 blur-3xl" />
        <div className="why-page-blob-b absolute -right-16 top-32 h-64 w-64 rounded-full bg-[#0b50da]/25 blur-3xl" />
      </div>

      <section className="relative border-b border-[#e2e8f0] bg-[#f8f9fa]/90">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Why Shefware</p>
          </Reveal>
          <Reveal delayMs={80}>
            <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Email and mailbox data power decisions, compliance, and continuity.{' '}
              <span className="bg-gradient-to-r from-[#00429d] to-[#0b50da] bg-clip-text text-transparent">
                We build software for that responsibility—not for novelty.
              </span>
            </h1>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#475569] sm:text-xl">
              Shefware is a focused portfolio of migration, conversion, backup, and viewer tools for Microsoft 365,
              IMAP, and classic Outlook workloads. Our goal is simple: give IT, MSPs, and project teams dependable
              utilities and clear boundaries—so you run{' '}
              <strong className="font-semibold text-[#334155]">repeatable runbooks</strong> instead of one-off scripts
              and consumer-grade installers.
            </p>
          </Reveal>
          <Reveal delayMs={220}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/marketplace"
                className="inline-flex rounded-lg bg-[#00429d] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#00429d]/25 transition hover:bg-[#003580] hover:shadow-lg motion-reduce:transition-colors"
              >
                Browse marketplace
              </Link>
              <Link
                to="/services"
                className="inline-flex rounded-lg border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#00429d]/40 hover:text-[#00429d] motion-reduce:transition-colors"
              >
                Talk to services
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center rounded-lg px-2 py-3 text-sm font-semibold text-[#00429d] underline-offset-4 transition hover:underline"
              >
                View all products →
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <CountUpStat value={7} label="Product lines" sub="Conversion, backup, viewers & 365 paths" />
            <CountUpStat value={1} label="Live tool today" sub="OST → PST at osttopst.us" />
            <CountUpStat value={100} suffix="%" label="Focus" sub="Email data & mailbox operations only" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Mission</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Reduce migration risk without dumbing down the problem
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#475569] sm:text-lg">
              Email systems are heterogeneous: mixed clients, legacy PSTs, disconnected OSTs, tenant boundaries, and
              regulatory expectations. We do not promise a single button for every scenario. We{' '}
              <strong className="font-semibold text-[#334155]">ship narrow, well-scoped tools</strong>, document them
              honestly, and stand next to services teams when your program needs design—not just software.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f8fafc] p-8 sm:p-10">
          <Reveal delayMs={100}>
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#0f172a]">
              What you can expect from us
            </h3>
            <ul className="mt-5 space-y-3">
              {commitments.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#475569]">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00429d]"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-[#f8f9fa] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0f172a] sm:text-3xl">
              Principles we optimize for
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[#64748b] sm:text-base">
              These are the trade-offs we make on purpose—so the product set stays coherent as we grow.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delayMs={i * 70}>
                <li className="group h-full rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00429d]/20 hover:shadow-md motion-reduce:hover:translate-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00429d]/10 transition-colors group-hover:bg-[#00429d]/15">
                    <PillarIcon name={p.icon} />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-base font-bold text-[#0f172a]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0f172a] sm:text-3xl">
            Who we build for
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[#64748b] sm:text-base">
            Different roles care about different risks. Shefware is structured so each audience finds a credible entry
            point—then depth when they need it.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delayMs={i * 80}>
              <li className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#00429d] before:to-[#0b50da] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 motion-reduce:before:opacity-100">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#0f172a]">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{a.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#e2e8f0] bg-[#00429d] py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Try before you standardize</p>
                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
                  OST → PST is live on osttopst.us
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                  Use it to validate fit for your deskside and migration workflows. When you need volume licensing,
                  support SLAs, or integration with internal systems, pair the tool with our services and enterprise
                  options.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href="https://osttopst.us"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex justify-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#00429d] shadow-lg transition hover:bg-[#f1f5f9] motion-reduce:transition-colors"
                >
                  Open osttopst.us
                </a>
                <Link
                  to="/products/ost-to-pst-converter"
                  className="inline-flex justify-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 motion-reduce:transition-colors"
                >
                  Read product overview
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
