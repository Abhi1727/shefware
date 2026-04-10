import { Link } from 'react-router-dom'

const pillars = [
  {
    title: 'Built for IT reality',
    body: 'Tight timelines, partial data sets, and “we need it Friday” requests. Shefware products are shaped for operations teams—not slide decks.',
  },
  {
    title: 'Clarity over magic',
    body: 'We document what the tools do, what they do not do, and how they fit next to services when automation hits human judgment.',
  },
  {
    title: 'Security-minded defaults',
    body: 'From backup policies to conversion workflows, we bias toward least surprise: explicit scopes, visible progress, and paths your security reviewers can follow.',
  },
] as const

export function WhyShefwarePage() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#e2e8f0] bg-[#f8f9fa]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Why Shefware</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-heading)] text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl">
            Email data is business-critical. Treat it that way.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]">
            Shefware focuses on migration, conversion, and backup for mail platforms—so your teams can execute repeatable
            runbooks instead of improvising with consumer-grade utilities.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/marketplace"
              className="inline-flex rounded-lg bg-[#00429d] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#003580]"
            >
              Browse marketplace
            </Link>
            <Link
              to="/services"
              className="inline-flex rounded-lg border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#00429d]/30"
            >
              Talk to services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold text-[#0f172a] sm:text-3xl">
          What we optimize for
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.title} className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fa] p-8">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#0f172a]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#e2e8f0] bg-[#00429d] py-12 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold">Already live: OST → PST</h2>
            <p className="mt-2 max-w-xl text-sm text-white/85">
              Validate the experience on osttopst.us, then explore enterprise options and services when you need SLAs and
              custom pipelines.
            </p>
          </div>
          <a
            href="https://osttopst.us"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#00429d] transition hover:bg-[#f1f5f9]"
          >
            Open osttopst.us
          </a>
        </div>
      </section>
    </div>
  )
}
