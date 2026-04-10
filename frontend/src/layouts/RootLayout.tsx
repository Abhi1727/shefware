import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getPageTitle } from '../lib/routeMeta'

export function RootLayout() {
  const { pathname } = useLocation()
  useDocumentTitle(getPageTitle(pathname))

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] text-[#191c1d]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#00429d] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00429d] focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
