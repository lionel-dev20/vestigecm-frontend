import type { ReviewForm } from '#shared/utils/review'

// Dépôt d'un avis, connecté ou non : enregistré « en attente » dans WooCommerce
export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ReviewForm> & { website?: string }>(event)

  // Champ piège invisible : seuls les robots le remplissent ; on fait comme si tout allait bien
  if (body?.website) return { status: 'pending' }

  const errors = validateReview(body ?? {})
  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Avis incomplet', data: { errors } })
  }

  // Anti-spam : 3 avis par adresse IP toutes les 10 minutes
  rateLimit(event, 'avis', 3, 10 * 60 * 1000)

  if (!isWooConfigured()) throw createError({ statusCode: 503, statusMessage: 'Avis momentanément indisponibles' })

  const product = await wooProductDetail(getRouterParam(event, 'slug') ?? '')
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })

  await wooCreateReview(Number(product.detail.id), body as ReviewForm)
  return { status: 'pending' }
})
