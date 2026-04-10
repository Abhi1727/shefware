import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../../data/products'

const figmaFile =
  'https://www.figma.com/design/qog60m4YVUE6cwuGJkt7ML/shefware-1?m=dev'

function figmaDeepLink(nodeId: string) {
  const q = nodeId.replace(':', '-')
  return `${figmaFile}&node-id=${encodeURIComponent(q)}`
}

export function ProductDetailPage() {
  const { productSlug } = useParams()
  const product = productSlug ? getProduct(productSlug) : undefined

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#191c1d]">Product not found</h1>
        <p className="mt-4 text-[#424653]">This product does not exist or the link is outdated.</p>
        <Link to="/products" className="mt-8 inline-block text-sm font-semibold text-[#00429d] hover:underline">
          ← Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16">
        <nav className="text-sm text-[#64748b]">
          <Link to="/products" className="font-medium text-[#00429d] hover:underline">
            Products
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-[#191c1d]">{product.listTitle}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00429d]">Shefware product</p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
              {product.pageTitle}
            </h1>
            <p className="mt-4 text-lg font-medium text-[#334155]">{product.tagline}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">{product.description}</p>

            <ul className="mt-10 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-[#424653]">
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#00429d]"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {product.liveUrl ? (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center rounded-lg bg-[#00429d] px-6 py-3 text-sm font-bold text-white shadow-[0px_8px_24px_-6px_rgba(0,66,157,0.45)] transition hover:bg-[#003580]"
                >
                  {product.liveCtaLabel ?? 'Open tool'}
                </a>
              ) : (
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-lg bg-[#00429d] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#003580]"
                >
                  Request pricing
                </Link>
              )}
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#00429d]/30 hover:text-[#00429d]"
              >
                View on marketplace
              </Link>
            </div>

            <p className="mt-8 text-xs text-[#94a3b8]">
              Design reference:{' '}
              <a
                href={figmaDeepLink(product.figmaNodeRef)}
                className="font-medium text-[#00429d] hover:underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                Figma ({product.figmaNodeRef})
              </a>
            </p>
          </div>

          <aside className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fa] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">Commercial</p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#00429d]">
              {product.priceLabel}
            </p>
            <p className="mt-1 text-sm text-[#64748b]">{product.ratingLabel}</p>
            <div className="mt-6 border-t border-[#e2e8f0] pt-6">
              <p className="text-sm font-semibold text-[#191c1d]">Need a scoped migration?</p>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                Our services team runs cutovers, tenant moves, and custom pipelines when software alone is not enough.
              </p>
              <Link
                to="/services"
                className="mt-4 inline-flex text-sm font-semibold text-[#00429d] hover:underline"
              >
                Explore services →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
