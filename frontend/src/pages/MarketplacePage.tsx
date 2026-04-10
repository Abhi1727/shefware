import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PRODUCT_CATEGORIES,
  PRODUCT_SLUGS,
  PRODUCTS,
  type ProductCategoryId,
} from '../data/products'

function ProductCardPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="flex h-28 items-center justify-center rounded-lg border border-dashed border-[#e2e8f0] bg-[#f8fafc] text-center text-xs font-medium text-[#94a3b8]"
      aria-hidden
    >
      {title}
    </div>
  )
}

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategoryId | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCT_SLUGS.filter((slug) => {
      const p = PRODUCTS[slug]
      if (category !== 'all' && !p.categories.includes(category)) return false
      if (!q) return true
      return (
        p.listTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      )
    })
  }, [query, category])

  return (
    <div className="bg-[#f8f9fa]">
      <section className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Shefware marketplace</p>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            Transform data · Simplify migration · Ship with confidence
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
            Browse conversion, backup, and Microsoft 365 tooling in one place. Filter by category or search by name—then
            open a product page for specs and purchase paths.
          </p>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
            <label htmlFor="marketplace-search" className="sr-only">
              Search products
            </label>
            <input
              id="marketplace-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search migration tools, backup solutions…"
              className="min-w-0 flex-1 rounded-lg border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none ring-[#00429d]/20 placeholder:text-[#94a3b8] focus:border-[#00429d] focus:ring-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[#00429d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003580]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:py-12">
        <aside className="w-full shrink-0 lg:w-56">
          <p className="text-xs font-bold uppercase tracking-wide text-[#64748b]">Tool categories</p>
          <ul className="mt-4 space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={[
                  'flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition',
                  category === 'all'
                    ? 'bg-[#00429d]/10 text-[#00429d]'
                    : 'text-[#424653] hover:bg-white hover:text-[#00429d]',
                ].join(' ')}
              >
                All tools
              </button>
            </li>
            {PRODUCT_CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={[
                    'flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition',
                    category === c.id
                      ? 'bg-[#00429d]/10 text-[#00429d]'
                      : 'text-[#424653] hover:bg-white hover:text-[#00429d]',
                  ].join(' ')}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 space-y-8">
          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-[#00429d] via-[#0b50da] to-[#133cb8] p-8 text-white shadow-lg sm:p-10">
            <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-100">
              Shefware solutions
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight sm:text-3xl">
              Move mailboxes faster. Manage backups smarter.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
              Pick a tool that matches your runbook—conversion utilities for deskside teams, backup for IMAP estates,
              and Microsoft 365 paths when timelines are non‑negotiable.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#0f172a]">
                {filtered.length} product{filtered.length === 1 ? '' : 's'}
              </h3>
              <Link to="/products" className="text-sm font-semibold text-[#00429d] hover:underline">
                Compact product list →
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((slug) => {
                const p = PRODUCTS[slug]
                return (
                  <li key={slug}>
                    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#00429d]/25 hover:shadow-md">
                      <div className="p-4">
                        <ProductCardPlaceholder title={p.listTitle} />
                      </div>
                      <div className="flex flex-1 flex-col border-t border-[#f1f5f9] p-5">
                        <h4 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#0f172a]">
                          {p.listTitle}
                        </h4>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#475569]">
                          {p.description}
                        </p>
                        <p className="mt-3 text-xs text-[#64748b]">{p.ratingLabel}</p>
                        <p className="mt-1 font-[family-name:var(--font-heading)] text-lg font-bold text-[#00429d]">
                          {p.priceLabel}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            to={`/products/${slug}`}
                            className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#00429d] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#003580]"
                          >
                            Details
                          </Link>
                          {p.liveUrl ? (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f8f9fa] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-[#0f172a] transition hover:border-[#00429d]/30"
                            >
                              Live tool
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {filtered.length === 0 ? (
              <p className="mt-8 rounded-lg border border-dashed border-[#e2e8f0] bg-white p-8 text-center text-sm text-[#64748b]">
                No products match your filters. Try clearing search or choosing &ldquo;All tools&rdquo;.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
