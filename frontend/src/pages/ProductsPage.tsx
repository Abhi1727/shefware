import { Link } from 'react-router-dom'
import { PRODUCT_SLUGS, PRODUCTS } from '../data/products'

export function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Catalog</p>
      <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-[#191c1d]">
        Products
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#424653]">
        Shefware utilities for conversion, viewing, backup, and Microsoft 365 moves. Open a product for positioning,
        feature bullets, and purchase or live-tool links.
      </p>
      <p className="mt-2 text-sm text-[#64748b]">
        Prefer a storefront layout? See the{' '}
        <Link to="/marketplace" className="font-semibold text-[#00429d] hover:underline">
          marketplace
        </Link>
        .
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_SLUGS.map((slug) => {
          const p = PRODUCTS[slug]
          return (
            <li key={slug}>
              <Link
                to={`/products/${slug}`}
                className="flex h-full flex-col rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition hover:border-[#00429d]/30 hover:shadow-md"
              >
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#191c1d]">
                  {p.listTitle}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#424653]">{p.tagline}</p>
                <p className="mt-4 text-sm font-semibold text-[#00429d]">{p.priceLabel}</p>
                <span className="mt-3 inline-flex text-sm font-semibold text-[#00429d]">View product →</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
