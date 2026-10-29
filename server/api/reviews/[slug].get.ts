// Avis approuvés d'un produit (vide sans WooCommerce)
export default defineEventHandler(async (event) => {
  if (!isWooConfigured()) return []
  const product = await wooProductDetail(getRouterParam(event, 'slug') ?? '')
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })
  return wooProductReviews(Number(product.detail.id))
})
