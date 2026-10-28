// Recherche de produits : /api/search?q=collagene&limit=6
export default defineEventHandler((event) => {
  const { q, limit } = getQuery(event)
  const query = String(q ?? '').trim().slice(0, 80)
  if (query.length < 2) return []
  return searchProducts(query, Math.min(Number(limit) || 24, 48))
})
