import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium text-[#64748b]">404</p>
      <h1 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#191c1d]">
        Page not found
      </h1>
      <Link
        to="/"
        className="mt-6 text-sm font-semibold text-[#00429d] underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </div>
  )
}
