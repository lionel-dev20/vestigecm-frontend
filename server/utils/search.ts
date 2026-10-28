import type { Product } from '#shared/types/product'
import type { WooProduct } from './woocommerce'

// « Collagène » → « collagene » : recherche insensible aux accents et à la casse
const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const tokenize = (text: string) => normalize(text).split(/[^a-z0-9]+/).filter(Boolean)

// Catalogue d'exemple sans doublons (un produit peut figurer dans plusieurs listes)
export function catalogProducts(): Product[] {
  return [...new Map([...dealProducts, ...healthProducts, ...agriProducts].map(product => [product.to, product])).values()]
}

// Chaque mot cherché doit commencer un mot du nom : « vitamine c » trouve « Vitamine C », pas « avec vitamine D3 »
export function matchesQuery(product: Product, query: string) {
  const tokens = tokenize(product.name)
  return tokenize(query).every(word => tokens.some(token => token.startsWith(word)))
}

// WooCommerce s'il est configuré, sinon le catalogue d'exemple
export async function searchProducts(query: string, limit: number): Promise<Product[]> {
  if (isWooConfigured()) {
    const products = await wooFetch<WooProduct[]>('/products', {
      query: { search: query, status: 'publish', per_page: limit, _fields: wooProductFields },
    })
    return products.map(toProduct)
  }

  return catalogProducts().filter(product => matchesQuery(product, query)).slice(0, limit)
}
