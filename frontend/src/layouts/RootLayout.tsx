import { NavLink, Outlet } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
    isActive
      ? 'bg-[#00429d]/10 text-[#00429d]'
      : 'text-[#424653] hover:bg-[#00429d]/5 hover:text-[#00429d]',
  ].join(' ')

const marketplaceNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
    isActive ? 'bg-amber-500/15 text-amber-800' : 'text-[#424653] hover:bg-amber-500/10 hover:text-amber-900',
  ].join(' ')

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] text-[#191c1d]">
      <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-[#191c1d]"
          >
            <span
              className="flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #155dfc 0%, #133cb8 100%)',
              }}
              aria-hidden
            >
              S
            </span>
            Shefware
          </NavLink>
          <nav className="flex flex-wrap items-center justify-end gap-0.5 sm:gap-1">
            <NavLink to="/marketplace" className={marketplaceNavClass}>
              Marketplace
            </NavLink>
            <NavLink to="/why-shefware" className={navClass}>
              Why Shefware
            </NavLink>
            <NavLink to="/products" className={navClass}>
              Products
            </NavLink>
            <NavLink to="/services" className={navClass}>
              Services
            </NavLink>
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  )
}
