import type { WooProduct } from '../../utils/woocommerce'

// Produits WooCommerce au format des cartes du site
// Exemples : /api/shop/products · /api/shop/products?category=12&per_page=12 · ?on_sale=true
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const products = await wooFetch<WooProduct[]>('/products', { query: {
    status: 'publish',
    per_page: Math.min(Number(query.per_page) || 12, 50),
    ...(query.category ? { category: String(query.category) } : {}),
    ...(query.on_sale === 'true' ? { on_sale: 'true' } : {}),
    _fields: wooProductFields,
  } })
  return products.map(toProduct)
})
