export default defineEventHandler(async (event) => {
  const product = await getProductDetail(getRouterParam(event, 'slug') ?? '')
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })
  return product
})
