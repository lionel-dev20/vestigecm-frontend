import type { H3Event } from 'h3'

// Limite simple en mémoire : au plus `max` actions par adresse IP sur `windowMs`
// (une seule instance de serveur ; au-delà, passer par un stockage partagé type Redis)
const hits = new Map<string, number[]>()

export function rateLimit(event: H3Event, scope: string, max: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'inconnue'
  const key = `${scope}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter(time => now - time < windowMs)

  if (recent.length >= max) {
    hits.set(key, recent)
    throw createError({ statusCode: 429, statusMessage: 'Trop de tentatives, réessayez dans quelques minutes' })
  }
  hits.set(key, [...recent, now])
}
