import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../NotFoundPage'
import { ServiceInquiryForm } from '../../components/services/ServiceInquiryForm'
import { SERVICE_PAGE_ASSETS } from './servicePageAssets'
import {
  BentoCardIcon,
  BentoTitle,
  ProcessStepIcon,
  SecurityCardIcon,
} from './servicePageIcons'
import { isServicePageSlug, SERVICE_PAGES } from './servicePagesData'

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-5">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,66,157,0.1)]">
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden>
          <path
            d="M1 5.5L5 9.5L13 1"
            stroke="#00429d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="text-[16.8px] font-medium leading-[27.3px] text-[#191c1d] font-[family-name:var(--font-heading)]">
        {children}
      </p>
    </li>
  )
}

export function ServiceDetailPage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>()
  if (!serviceSlug || !isServicePageSlug(serviceSlug)) {
    return <NotFoundPage />
  }
  const c = SERVICE_PAGES[serviceSlug]
  const bannerUrl = SERVICE_PAGE_ASSETS[c.heroBannerKey]
  const complianceSrc =
    serviceSlug === 'google-workspace-to-microsoft-365-migration'
      ? '/images/gw-migration/compliance.jpg'
      : SERVICE_PAGE_ASSETS.complianceIllustration

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d]">
      <section className="border-b border-[#e2e8f0]/60 bg-[#f8f9fa]">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            <div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight tracking-tight text-[#191c1d] sm:text-4xl sm:leading-[1.25] lg:max-w-[42rem]">
                {c.hero.title}
              </h1>
              <p className="mt-4 text-xl font-normal text-black">{c.hero.subtitle}</p>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#424653]">{c.hero.body}</p>
              <div className="mt-10 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-5 w-5 text-amber-400" viewBox="0 0 20 19" fill="currentColor" aria-hidden>
                    <path d="M10 0l2.45 6.13L19 7.24l-5 4.9 1.18 6.86L10 15.77 4.82 19l1.18-6.86-5-4.9 6.55-1.11L10 0z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <ServiceInquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid max-w-xl grid-cols-3 gap-6 sm:mx-auto sm:max-w-2xl">
          <div className="text-center">
            <p className="text-4xl font-semibold tracking-tight text-[#0a58ca] sm:text-5xl">{c.metrics.v1}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#424653]">{c.metrics.l1}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-semibold tracking-tight text-[#0a58ca] sm:text-5xl">{c.metrics.v2}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#424653]">{c.metrics.l2}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-semibold tracking-tight text-[#0a58ca] sm:text-5xl">{c.metrics.v3}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#424653]">{c.metrics.l3}</p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-9 text-[#191c1d] sm:text-[30px] sm:leading-9">
            {c.benefits.sectionTitle}
          </h2>
          <div className="mt-2 h-1 w-full max-w-[702px] bg-[#00429d]" aria-hidden />
          <ul className="mt-8 flex flex-col gap-6">
            {c.benefits.items.map((text) => (
              <CheckRow key={text}>{text}</CheckRow>
            ))}
          </ul>
        </div>
      </section>

      <div className="relative aspect-[1280/732] w-full max-h-[60vh] min-h-[200px] overflow-hidden bg-slate-100">
        <img src={bannerUrl} alt="" className="h-full w-full object-cover object-center" />
      </div>

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-normal tracking-tight text-[#191c1d] sm:text-5xl sm:tracking-[-1.5px]">
            {c.process.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-[#424653]">{c.process.subtitle}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div
            className="absolute bottom-24 left-1/2 top-4 hidden w-1 -translate-x-1/2 rounded-full bg-[#00429d] lg:block"
            aria-hidden
          />
          <div className="flex flex-col gap-12 lg:gap-20">
            {c.process.steps.map((step, idx) => {
              const isLeft = idx % 2 === 0
              const n = idx + 1
              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-6 lg:flex-row lg:items-stretch ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`w-full lg:w-[calc(50%-2.5rem)] ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="relative rounded-lg border border-[rgba(195,198,214,0.15)] bg-white p-8 shadow-[0px_8px_32px_-4px_rgba(25,28,29,0.08)]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9dbfe]">
                          <ProcessStepIcon type={step.icon} />
                        </div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#191c1d]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-[#424653]">{step.body}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex shrink-0 justify-center lg:w-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border-4 border-[#f8f9fa] bg-[#00429d] text-base font-semibold text-white">
                      {n}
                    </div>
                  </div>
                  <div className="hidden w-full lg:block lg:w-[calc(50%-2.5rem)]" aria-hidden />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto max-w-[1280px] text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight sm:text-5xl sm:tracking-[-1.5px]">
            <BentoTitle segments={c.bento.title} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-[#424653]">{c.bento.subtitle}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1232px] px-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
            style={{
              background:
                'linear-gradient(25deg, rgba(217, 226, 255, 0.35) 0%, rgba(217, 226, 255, 0) 50%, rgba(214, 227, 255, 0.35) 100%)',
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute left-0 right-0 top-1/3 hidden h-48 justify-center opacity-40 lg:flex">
            <img
              src={SERVICE_PAGE_ASSETS.journeyPath}
              alt=""
              className="max-h-full w-full max-w-5xl object-contain"
            />
          </div>
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {c.bento.cards.map((card) => (
              <div
                key={card.title}
                className={`relative rounded-lg border border-white/50 bg-white/90 p-8 shadow-[0px_8px_32px_-4px_rgba(25,28,29,0.08)] backdrop-blur-sm ${card.offset}`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#c9dbfe]">
                  <BentoCardIcon type={card.icon} />
                </div>
                <h3 className="mt-6 text-center font-[family-name:var(--font-heading)] text-xl font-bold text-[#191c1d]">
                  {card.title}
                </h3>
                <p className="mt-4 text-center text-sm leading-relaxed text-[#424653]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f4f8ff] to-[#f8f9fa] px-4 pb-6 pt-10 sm:px-6">
        <div className="mx-auto max-w-[1280px] text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#191c1d] sm:text-5xl sm:tracking-[-1.5px]">
            {c.security.line2 ? (
              <>
                <span className="block">{c.security.line1}</span>
                <span className="block">{c.security.line2}</span>
              </>
            ) : (
              <span className="block">{c.security.line1}</span>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-7 text-[#424653]">{c.security.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {c.security.cards.map((card) => (
            <div
              key={card.title}
              className="relative rounded-lg bg-white pb-8 pt-10 shadow-[0px_8px_32px_-4px_rgba(25,28,29,0.08)]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#c9dbfe]">
                <SecurityCardIcon type={card.icon} />
              </div>
              <h3
                className={`mx-auto mt-4 max-w-[16rem] text-center font-[family-name:var(--font-heading)] text-xl font-bold text-[#191c1d] ${card.title === 'Safe and Secure Cloud Environment' ? 'min-h-[3.5rem]' : ''}`}
              >
                {card.title}
              </h3>
              <p className="mx-auto mt-4 max-w-sm px-6 text-center text-sm leading-relaxed text-[#424653]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f3f4f5] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-2xl bg-white p-8 shadow-sm sm:p-12 lg:flex lg:items-center lg:gap-12">
          <div className="flex-1">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#191c1d] sm:text-[30px] sm:leading-9">
              Certified Compliance Standards
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#424653]">{c.complianceBody}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {(['SOC2 Certified', 'GDPR Compliant', 'ISO 27001'] as const).map((label) => (
                <span
                  key={label}
                  className="rounded-sm bg-[#edeeef] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#4e5f7d]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mt-10 h-64 flex-1 overflow-hidden rounded-lg shadow-lg lg:mt-0 lg:h-80">
            <img src={complianceSrc} alt="" className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </section>
    </div>
  )
}
