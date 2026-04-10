import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroIllustration from '../assets/hero.png'
import { HomeLogoMarquee } from '../components/home/HomeLogoMarquee'
import { HomePromoCarousel } from '../components/home/HomePromoCarousel'
import { SITE } from '../config/site'
import { PRODUCT_SLUGS, PRODUCTS } from '../data/products'

const valueProps = [
  {
    title: 'No complicated setup',
    body: 'Get up and running in minutes with intuitive onboarding and deployment paths that match how IT already works.',
    icon: 'rocket' as const,
  },
  {
    title: 'No technical headaches',
    body: 'Focus on outcomes while we keep conversion, backup, and migration flows predictable, observable, and documented.',
    icon: 'support' as const,
  },
  {
    title: 'Secure data management',
    body: 'Enterprise-minded defaults: scoped access, clear data handling, and workflows auditors and security teams can reason about.',
    icon: 'shield' as const,
  },
] as const

function ValueIcon({ name }: { name: (typeof valueProps)[number]['icon'] }) {
  const cls = 'h-7 w-7 text-[#0b50da]'
  if (name === 'rocket') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    )
  }
  if (name === 'support') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337L5.05 21l1.395-3.72C5.512 15.042 5 13.574 5 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    )
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  )
}

const steps = [
  {
    n: '01',
    title: 'Select Tool',
    body: 'Choose the tool based on your migration or backup need.',
  },
  {
    n: '02',
    title: 'Connect Account',
    body: 'Securely connect your mailbox or data source.',
  },
  {
    n: '03',
    title: 'Configure Settings',
    body: 'Apply filters, formats, and preferences.',
  },
  {
    n: '04',
    title: 'Run & Track',
    body: 'Start the process and monitor progress in real time.',
  },
] as const

const testimonials = [
  {
    quote:
      'The Office 365 migration tool was a lifesaver for our acquisition project. Smooth and reliable.',
    name: 'Andrew Carter',
    role: 'VP Operations',
  },
  {
    quote: 'Clean interface, fast processing, and top-tier support. Highly recommended for enterprises.',
    name: 'Laura Mitchell',
    role: 'IT Director',
  },
  {
    quote: 'Migrating 5,000+ mailboxes with zero downtime seemed impossible until we found Shefware.',
    name: 'Daniel Reeves',
    role: 'Project Lead',
  },
] as const

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#191c1d] sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-lg leading-relaxed text-[#424653]">{subtitle}</p> : null}
    </div>
  )
}

export function HomePage() {
  const [heroImgSrc, setHeroImgSrc] = useState<string>(heroIllustration)

  return (
    <div className="bg-[#f8f9fa]">
      <HomePromoCarousel />

      {/* Hero + value props — [Figma 72:372](https://www.figma.com/design/qog60m4YVUE6cwuGJkt7ML/shefware-1?node-id=72-372&m=dev) */}
      <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white">
        <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute -left-32 -top-24 h-96 w-[28rem] rounded-full bg-[#0b50da] blur-[60px]" />
          <div className="absolute -bottom-24 -right-32 h-72 w-96 rounded-full bg-[#0b50da] blur-[50px]" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-4 pb-20 pt-12 text-center sm:px-6 sm:pb-24 sm:pt-16">
          <h1 className="mx-auto max-w-[46rem] font-[family-name:var(--font-heading)] text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0f172a] sm:text-5xl sm:leading-[1.05]">
            Empower Your Workflow with <span className="text-[#0b50da]">Shefware</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[42rem] text-lg leading-relaxed text-[#475569] sm:text-xl">
            Experience a modern, professional platform designed for reliability and scale. Stop managing infrastructure
            and start building value.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <a
              href="#value-propositions"
              className="inline-flex min-w-[200px] items-center justify-center rounded-xl bg-[#0b50da] px-8 py-3.5 text-lg font-bold text-white shadow-[0px_20px_25px_-5px_rgba(11,80,218,0.3),0px_8px_10px_-6px_rgba(11,80,218,0.3)] transition hover:bg-[#093d99]"
            >
              Discover Solutions
            </a>
            <Link
              to="/marketplace"
              className="text-sm font-semibold text-[#0f172a] underline-offset-4 hover:text-[#0b50da] hover:underline"
            >
              Browse marketplace →
            </Link>
          </div>

          <div id="value-propositions" className="mt-16 scroll-mt-24">
            <div className="mx-auto grid max-w-[1000px] gap-8 sm:grid-cols-3 sm:gap-8">
              {valueProps.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(11,80,218,0.1)]">
                    <ValueIcon name={card.icon} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-heading)] text-lg font-bold text-[#0f172a]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <img
              src={heroImgSrc}
              alt=""
              className="mx-auto w-full max-w-lg object-contain"
              width={572}
              height={320}
              loading="lazy"
              onError={() => setHeroImgSrc(SITE.heroImageFallbackUrl)}
            />
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-[#e2e8f0] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[720px] px-4 text-center sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#191c1d] sm:text-3xl">
            Built for serious email operations
          </h2>
          <p className="mt-4 text-base leading-7 text-[#424653]">
            Shefware helps enterprises move, archive, and safeguard mail with repeatable runbooks, strong security
            controls, and support when timelines are tight.
          </p>
        </div>
      </section>

      <HomeLogoMarquee />

      {/* Product grid — maps to catalog + Figma product frames */}
      <section id="email-tools" className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <SectionTitle
            eyebrow="Catalog"
            title="Email tools that match your runbooks"
            subtitle="Seven focused products—from live OST→PST conversion to viewers, backup, and Microsoft 365 moves."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_SLUGS.map((slug) => {
              const card = PRODUCTS[slug]
              return (
                <article
                  key={slug}
                  className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-[0px_8px_32px_-4px_rgba(25,28,29,0.06)] transition hover:border-[#00429d]/25"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#c9dbfe]">
                    <svg className="h-7 w-7 text-[#00429d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl font-bold text-[#191c1d]">
                    {card.pageTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#424653]">{card.tagline}</p>
                  {card.liveUrl ? (
                    <a
                      href={card.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-4 inline-flex text-sm font-semibold text-[#00429d] hover:underline"
                    >
                      Live tool ↗
                    </a>
                  ) : null}
                  <Link
                    to={`/products/${slug}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#00429d] hover:underline"
                  >
                    View product
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              )
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f172a] shadow-sm transition hover:border-[#00429d]/30"
            >
              Open marketplace layout
            </Link>
            <Link
              to="/products"
              className="inline-flex rounded-lg bg-[#00429d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003580]"
            >
              Plain product list
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#e2e8f0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1160px] px-4 sm:px-6">
          <SectionTitle
            title="How Shefware Works"
            subtitle="Simple steps to migrate, backup, and manage your email data"
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.n} className="relative rounded-xl border border-[#e2e8f0] bg-[#f8f9fa] p-6 pt-8">
                <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[#00429d] px-3 py-1 text-xs font-bold text-white">
                  {step.n}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#191c1d]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#424653]">{step.body}</p>
                {i < steps.length - 1 ? (
                  <div
                    className="pointer-events-none absolute left-full top-1/2 z-0 hidden h-0.5 w-6 -translate-y-1/2 bg-[#c9dbfe] lg:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Know more</p>
          <SectionTitle title="Resources to Help You Stay on Top of IT" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                t: 'News & Updates',
                d: 'Know about the latest product announcements and enhancements.',
              },
              {
                t: 'FAQs',
                d: 'Get fast answers to common questions about our migration tools.',
              },
              {
                t: 'Our Blogs',
                d: 'Know some tips, tutorials, and deep industry understanding.',
              },
            ].map((card) => (
              <article
                key={card.t}
                className="flex flex-col rounded-xl border border-[#e2e8f0] bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#c9dbfe]">
                  <svg className="h-8 w-8 text-[#00429d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-lg font-bold text-[#191c1d]">
                  {card.t}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#424653]">{card.d}</p>
                <a href="#" className="mt-6 text-sm font-semibold text-[#00429d] hover:underline">
                  Read More »
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-[#e2e8f0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <SectionTitle title="What Our Customers Say" />
          <div className="mx-auto mt-4 flex justify-center gap-1" aria-hidden>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="h-5 w-5 text-amber-400" viewBox="0 0 20 19" fill="currentColor">
                <path d="M10 0l2.45 6.13L19 7.24l-5 4.9 1.18 6.86L10 15.77 4.82 19l1.18-6.86-5-4.9 6.55-1.11L10 0z" />
              </svg>
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border border-[#e2e8f0] bg-[#f8f9fa] p-8 shadow-sm"
              >
                <p className="text-sm leading-relaxed text-[#424653]">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00429d] text-sm font-bold text-white"
                    aria-hidden
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-[family-name:var(--font-heading)] text-sm font-bold text-[#191c1d]">
                      {t.name}
                    </cite>
                    <p className="text-xs text-[#64748b]">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#003580] bg-[#00429d] py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-white sm:text-xl">
            100+ Software Solutions to Help Customers.
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#00429d] shadow-sm transition hover:bg-[#f1f5f9]"
          >
            View Products »
          </Link>
        </div>
      </section>
    </div>
  )
}
