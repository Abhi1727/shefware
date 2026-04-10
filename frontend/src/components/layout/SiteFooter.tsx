import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../../config/site'
import { subscribeNewsletter } from '../../lib/api'
import { BrandMark } from './BrandMark'
import { IconArrowRight, IconFacebook, IconLinkedIn, IconX } from './footerIcons'

const footerLink = 'text-sm text-[#99a1af] transition hover:text-white'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [newsStatus, setNewsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsMessage, setNewsMessage] = useState('')

  async function onNewsletterSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return
    setNewsStatus('loading')
    setNewsMessage('')
    try {
      await subscribeNewsletter(trimmed)
      setNewsStatus('success')
      setNewsMessage('Thanks for subscribing.')
      setEmail('')
    } catch (err) {
      setNewsStatus('error')
      setNewsMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <footer className="bg-[#101828] text-white">
      <div className="mx-auto max-w-[1280px] px-4 pb-10 pt-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2">
              <BrandMark variant="footer" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-5 text-[#99a1af]">{SITE.description}</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white">Products</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link className={footerLink} to="/products/ost-to-pst-converter">
                  OST to PST Converter
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/products/office-365-to-365">
                  Office 365 to 365
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/products/imap-backup">
                  IMAP Backup
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/marketplace">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white">Solutions</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link className={footerLink} to="/why-shefware">
                  Why Shefware
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/services/office-365-migration">
                  Office 365
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/products">
                  Product catalog
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/services/google-workspace-to-microsoft-365-migration">
                  Google Workspace
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/services/teams-migration">
                  Microsoft Teams
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white">Company</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link className={footerLink} to="/#about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/services">
                  Contact
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/services">
                  Support
                </Link>
              </li>
              <li>
                <Link className={footerLink} to="/#resources">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-white">Find Us on</h3>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                className="flex size-10 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Facebook"
              >
                <IconFacebook className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className="flex size-10 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20"
                aria-label="X (Twitter)"
              >
                <IconX className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="flex size-10 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="size-5" />
              </a>
            </div>
            <p className="mt-6 text-xs leading-4 text-[#94a3b8]">
              Subscribe to our newsletter to get latest updates!
            </p>
            <form onSubmit={onNewsletterSubmit} className="mt-3 flex max-w-sm">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-1 rounded-l border border-white/10 bg-white/10 px-4 py-2 text-xs text-white placeholder:text-[#64748b] outline-none focus:border-[#00429d] focus:ring-1 focus:ring-[#00429d]"
              />
              <button
                type="submit"
                disabled={newsStatus === 'loading'}
                className="flex shrink-0 items-center justify-center rounded-r bg-[#00429d] px-4 py-2 transition hover:bg-[#003580] disabled:opacity-60"
                aria-label="Subscribe"
              >
                <IconArrowRight className="size-4 text-white" />
              </button>
            </form>
            {newsMessage ? (
              <p
                className={`mt-2 text-xs ${newsStatus === 'error' ? 'text-red-400' : 'text-[#94a3b8]'}`}
                role="status"
              >
                {newsMessage}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#1e2939] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#99a1af]">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className={`${footerLink} whitespace-nowrap`}>
              Privacy Policy
            </a>
            <a href="#" className={`${footerLink} whitespace-nowrap`}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
