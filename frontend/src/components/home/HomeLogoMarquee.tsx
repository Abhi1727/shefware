import { PARTNER_LOGOS } from '../../data/partnerLogos'

function LogoCard({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex w-[132px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#e2e8f0] bg-white px-3 py-3 shadow-sm sm:w-[152px] sm:px-4 sm:py-4">
      <img src={src} alt="" className="h-9 w-full max-w-[112px] object-contain sm:h-10 sm:max-w-[120px]" loading="lazy" />
      <p className="mt-2.5 text-center text-[10px] font-semibold leading-tight text-[#475569] sm:text-[11px]">{name}</p>
    </div>
  )
}

export function HomeLogoMarquee() {
  return (
    <section className="border-b border-[#e2e8f0] bg-[#f8f9fa] py-12 sm:py-14" aria-labelledby="clients-heading">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          <div className="max-w-md shrink-0 lg:pt-2">
            <p id="clients-heading" className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00429d]">
              Our clients
            </p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold text-[#191c1d] sm:text-3xl">
              Supporting organizations with reliable email migration and data management solutions
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-3 text-center text-xs font-medium text-[#64748b] lg:text-left">Trusted by teams worldwide</p>

            {/* Reduced motion: static grid */}
            <div className="hidden flex-wrap justify-center gap-3 rounded-xl border border-[#e2e8f0] bg-white/80 p-4 motion-reduce:flex">
              {PARTNER_LOGOS.map((logo) => (
                <LogoCard key={logo.name} src={logo.src} name={logo.name} />
              ))}
            </div>

            {/* Infinite scroll row */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2e8f0] bg-white/60 py-3 motion-reduce:hidden">
              <div className="home-logo-marquee flex w-max">
                <div className="flex shrink-0 gap-4 px-2 sm:gap-5 sm:px-3">
                  {PARTNER_LOGOS.map((logo, i) => (
                    <LogoCard key={`a-${i}-${logo.name}`} src={logo.src} name={logo.name} />
                  ))}
                </div>
                <div className="flex shrink-0 gap-4 px-2 sm:gap-5 sm:px-3" aria-hidden>
                  {PARTNER_LOGOS.map((logo, i) => (
                    <LogoCard key={`b-${i}-${logo.name}`} src={logo.src} name={logo.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
