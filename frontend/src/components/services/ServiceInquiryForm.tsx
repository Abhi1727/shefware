import { type FormEvent, useState } from 'react'
import { submitInquiry } from '../../lib/api'

const COUNTRIES = [
  'Choose a country',
  'United States',
  'United Kingdom',
  'India',
  'Canada',
  'Australia',
  'Germany',
  'Other',
] as const

const HOURS = ['09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM', '04 PM'] as const
const MINS = ['00', '15', '30', '45'] as const
const ZONES = ['EST', 'CST', 'MST', 'PST', 'IST', 'UTC'] as const

const inputClass =
  'w-full rounded border border-[#e2e8f0] bg-[#f8fafc] px-[17px] py-3 text-sm text-[#191c1d] placeholder:text-[#94a3b8] outline-none focus:border-[#00429d] focus:ring-1 focus:ring-[#00429d]'

const labelClass =
  'text-xs font-semibold uppercase tracking-[0.6px] text-[#64748b]'

export function ServiceInquiryForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [hours, setHours] = useState('09 AM')
  const [mins, setMins] = useState('00')
  const [zone, setZone] = useState('EST')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country && country !== 'Choose a country' ? country : undefined,
        date: date || undefined,
        hours,
        mins,
        zone,
      })
      setStatus('success')
      setMessage('Thank you for your inquiry! We will contact you shortly.')
      setName('')
      setEmail('')
      setPhone('')
      setCountry('')
      setDate('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="w-full max-w-[494px] overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0px_20px_25px_-5px_rgba(30,58,138,0.05),0px_8px_10px_-6px_rgba(30,58,138,0.05)]">
      <div className="border-b border-[#f1f5f9] px-6 py-5 sm:px-12">
        <h2 className="font-[family-name:var(--font-heading)] text-[30px] font-extrabold tracking-[-0.75px] text-[#00429d]">
          Let&apos;s connect
        </h2>
      </div>

      <form onSubmit={onSubmit} className="px-4 pb-6 pt-2 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="gw-name">
              Name*
            </label>
            <input
              id="gw-name"
              className={inputClass}
              placeholder="Jane"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="gw-phone">
              Phone*
            </label>
            <input
              id="gw-phone"
              className={inputClass}
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="gw-email">
              Email*
            </label>
            <input
              id="gw-email"
              type="email"
              className={inputClass}
              placeholder="jane.doe@enterprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="gw-country">
              Select Your Country
            </label>
            <select
              id="gw-country"
              className={`${inputClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c === 'Choose a country' ? '' : c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 border-t border-[#f1f5f9] pt-4">
          <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#00429d]">
            Please choose an appropriate time for a callback (Optional)
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Date
              </span>
              <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Hours
              </span>
              <select className={inputClass} value={hours} onChange={(e) => setHours(e.target.value)}>
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Mins
              </span>
              <select className={inputClass} value={mins} onChange={(e) => setMins(e.target.value)}>
                {MINS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Zone
              </span>
              <select className={inputClass} value={zone} onChange={(e) => setZone(e.target.value)}>
                {ZONES.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded bg-[#00429d] py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#003580] disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending…' : 'Submit Request'}
          </button>
          <p className="max-w-[22rem] text-center text-[11px] text-[#64748b]">
            By submitting this form you agree to the terms in our{' '}
            <a href="#" className="font-semibold text-[#00429d] hover:underline">
              privacy policy
            </a>
            .
          </p>
          {message ? (
            <p
              className={`text-center text-sm ${status === 'error' ? 'text-red-600' : 'text-[#00429d]'}`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}
