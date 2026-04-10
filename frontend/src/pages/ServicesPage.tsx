import { Link } from 'react-router-dom'
import { SERVICE_PAGE_ORDER, SERVICE_PAGES } from './services/servicePagesData'

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-[#191c1d]">
        Services
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[#424653]">
        Explore migration and data services from Shefware. Select a service to view details and get in touch.
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_PAGE_ORDER.map((slug) => {
          const s = SERVICE_PAGES[slug]
          return (
            <li key={slug}>
              <Link
                to={`/services/${slug}`}
                className="block h-full rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition hover:border-[#00429d]/30 hover:shadow-md"
              >
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#00429d]">
                  {s.listTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#424653]">{s.listDescription}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#00429d]">View service →</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
