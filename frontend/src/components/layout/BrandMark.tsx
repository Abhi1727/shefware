type BrandMarkProps = {
  variant?: 'header' | 'footer'
}

export function BrandMark({ variant = 'header' }: BrandMarkProps) {
  const isFooter = variant === 'footer'
  return (
    <>
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg font-bold text-white ${
          isFooter ? 'size-9 rounded-[10px] text-base' : 'size-8 text-sm'
        }`}
        style={{
          background: 'linear-gradient(135deg, #155dfc 0%, #133cb8 100%)',
        }}
        aria-hidden
      >
        S
      </span>
      <span
        className={`font-[family-name:var(--font-heading)] font-bold tracking-tight ${
          isFooter ? 'text-xl text-white' : 'text-lg text-[#191c1d]'
        }`}
      >
        Shefware
      </span>
    </>
  )
}
