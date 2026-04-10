import { getProduct } from '../data/products'
import { isServicePageSlug, SERVICE_PAGES } from '../pages/services/servicePagesData'
import { SITE } from '../config/site'

const suffix = ` — ${SITE.name}`

export function getPageTitle(pathname: string): string {
  if (pathname === '/') return `${SITE.name} — ${SITE.tagline}`
  if (pathname === '/marketplace') return `Marketplace${suffix}`
  if (pathname === '/why-shefware') return `Why ${SITE.name}${suffix}`
  if (pathname === '/products') return `Products${suffix}`
  if (pathname === '/services') return `Services${suffix}`

  if (pathname.startsWith('/products/')) {
    const slug = pathname.slice('/products/'.length).split('/')[0] ?? ''
    const p = getProduct(slug)
    return p ? `${p.listTitle}${suffix}` : `Products${suffix}`
  }

  if (pathname.startsWith('/services/')) {
    const slug = pathname.slice('/services/'.length).split('/')[0] ?? ''
    if (slug && isServicePageSlug(slug)) {
      return `${SERVICE_PAGES[slug].listTitle}${suffix}`
    }
    return `Services${suffix}`
  }

  if (pathname === '/home') return `${SITE.name} — ${SITE.tagline}`

  return `Page not found${suffix}`
}
