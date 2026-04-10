import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#0f172a]">
        Page not found
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
        That URL does not match anything in our catalog. Try the home page, products, or marketplace.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex rounded-lg bg-[#00429d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003580]"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="inline-flex rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:border-[#00429d]/30"
        >
          Products
        </Link>
        <Link
          to="/marketplace"
          className="inline-flex rounded-lg border border-[#e2e8f0] bg-white px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition hover:border-[#00429d]/30"
        >
          Marketplace
        </Link>
      </div>
    </div>
  )
}
