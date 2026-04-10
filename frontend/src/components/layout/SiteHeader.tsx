import { NavLink } from 'react-router-dom'
import { BrandMark } from './BrandMark'

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

const navItems = [
  { to: '/', end: true, label: 'Home', className: navClass },
  { to: '/products', end: false, label: 'Products', className: navClass },
  { to: '/marketplace', end: false, label: 'Marketplace', className: marketplaceNavClass },
  { to: '/services', end: false, label: 'Services', className: navClass },
  { to: '/why-shefware', end: false, label: 'Why Shefware', className: navClass },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 outline-none ring-[#00429d] ring-offset-2 focus-visible:ring-2"
        >
          <BrandMark variant="header" />
        </NavLink>
        <nav className="flex flex-wrap items-center justify-end gap-0.5 sm:gap-1" aria-label="Primary">
          {navItems.map(({ to, end, label, className }) => (
            <NavLink key={to} to={to} end={end} className={className}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
