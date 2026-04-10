const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:5000/api'

type ApiErrorBody = { ok?: boolean; message?: string }

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await res.json().catch(() => ({}))) as T & ApiErrorBody
  if (!res.ok) {
    const msg =
      typeof data.message === 'string' ? data.message : `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data
}

export type ContactPayload = {
  fullName: string
  email: string
  company?: string
  message: string
}

export type InquiryPayload = {
  name: string
  email: string
  phone?: string
  country?: string
  date?: string
  hours?: string
  mins?: string
  zone?: string
}

export type OkMessage = { ok: boolean; message: string }

export function submitContact(payload: ContactPayload) {
  return postJson<OkMessage>('/contact', payload)
}

export function submitInquiry(payload: InquiryPayload) {
  return postJson<OkMessage>('/inquiry', payload)
}

export function subscribeNewsletter(email: string) {
  return postJson<OkMessage>('/newsletter', { email })
}

export async function checkHealth(): Promise<{ ok: boolean; service: string }> {
  const res = await fetch(`${API_BASE}/health`)
  if (!res.ok) throw new Error('Health check failed')
  return res.json() as Promise<{ ok: boolean; service: string }>
}
