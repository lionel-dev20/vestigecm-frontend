import type { Product, ProductDetail } from '#shared/types/product'
import type { Review, ReviewForm } from '#shared/utils/review'

// Champs WooCommerce utilisés par le site (l'API en renvoie beaucoup plus)
export interface WooProduct {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  sale_price: string
  average_rating: string
  rating_count: number
  images: { src: string; alt: string }[]
}

interface WooProductFull extends WooProduct {
  short_description: string
  description: string
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  categories: { id: number; name: string; slug: string }[]
  related_ids: number[]
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  parent: number
  count: number
  description: string
  image: { src: string } | null
}

// Champs demandés à WooCommerce (_fields) : réponse plus légère pour le mobile
export const wooProductFields = 'id,name,slug,price,regular_price,sale_price,average_rating,rating_count,images'

// Catégorie par défaut de WooCommerce, jamais affichée
const hiddenCategories = new Set(['uncategorized', 'non-classe'])

interface WooFetchOptions {
  method?: 'GET' | 'POST'
  query?: Record<string, string | number | undefined>
  body?: Record<string, unknown>
}

export function isWooConfigured() {
  const { woocommerce } = useRuntimeConfig()
  return Boolean(woocommerce.url && woocommerce.consumerKey)
}

function wooRequest({ method = 'GET', query, body }: WooFetchOptions) {
  const { woocommerce } = useRuntimeConfig()
  if (!isWooConfigured()) {
    throw createError({ statusCode: 503, statusMessage: 'WooCommerce non configuré (NUXT_WOOCOMMERCE_*)' })
  }

  // Authentification Basic : uniquement sur un WordPress en HTTPS
  const token = btoa(`${woocommerce.consumerKey}:${woocommerce.consumerSecret}`)
  return { baseURL: woocommerce.url, method, query, body, headers: { Authorization: `Basic ${token}` } }
}

// Client WooCommerce REST v3 (côté serveur : les clés ne quittent jamais le serveur)
// Erreurs : détail dans les journaux, message neutre au navigateur (pas d'adresse de l'admin)
export async function wooFetch<T>(path: string, options: WooFetchOptions = {}) {
  const request = wooRequest(options)
  try {
    return await $fetch<T>(`/wp-json/wc/v3${path}`, request)
  }
  catch (error) {
    throw upstreamError('Boutique', error)
  }
}

// Variante qui expose les en-têtes : total des résultats dans X-WP-Total
export async function wooFetchRaw<T>(path: string, options: WooFetchOptions = {}) {
  const request = wooRequest(options)
  try {
    return await $fetch.raw<T>(`/wp-json/wc/v3${path}`, request)
  }
  catch (error) {
    throw upstreamError('Boutique', error)
  }
}

// Catégories visibles (avec produits), mises en cache 10 min en production
export const wooCategories = defineCachedFunction(async () => {
  const categories = await wooFetch<WooCategory[]>('/products/categories', {
    query: { per_page: 100, hide_empty: 'true', _fields: 'id,name,slug,parent,count,description,image' },
  })
  return categories.filter(category => !hiddenCategories.has(category.slug))
}, { name: 'woo-categories', maxAge: 600, shouldBypassCache: () => import.meta.dev })

// « sante » → ID WooCommerce de la catégorie (undefined si elle n'existe pas)
export async function wooCategoryBySlug(slug: string) {
  const [category] = await wooFetch<WooCategory[]>('/products/categories', {
    query: { slug, _fields: 'id,name,slug,parent,count,description,image' },
  })
  return category
}

export async function wooProductsInCategory(slug: string, query: Record<string, string | number> = {}) {
  const category = await wooCategoryBySlug(slug)
  if (!category) return []
  const products = await wooFetch<WooProduct[]>('/products', {
    query: { status: 'publish', category: category.id, per_page: 12, _fields: wooProductFields, ...query },
  })
  return products.map(toProduct)
}

// Produit WooCommerce → format utilisé par les cartes du site
export function toProduct(wc: WooProduct): Product {
  const onSale = wc.sale_price !== '' && wc.sale_price !== wc.regular_price
  return {
    id: String(wc.id),
    name: decodeEntities(wc.name),
    to: `/p/${wc.slug}`,
    image: wc.images[0]?.src ?? '/images/products/placeholder.svg',
    rating: Number(wc.average_rating) || 0,
    reviews: wc.rating_count,
    price: Number(wc.price),
    oldPrice: onSale ? Number(wc.regular_price) : undefined,
  }
}

// HTML WooCommerce → paragraphes de texte (aucun HTML injecté dans la page)
function toParagraphs(html: string) {
  return html
    .split(/<\/p>|<br\s*\/?>|<\/li>/i)
    .map(part => decodeEntities(part.replace(/<[^>]+>/g, '')).trim())
    .filter(Boolean)
}

// Fiche WooCommerce gardée 30 s : la fiche, ses produits liés et ses avis partagent la même requête
export const wooProductDetail = defineCachedFunction(fetchWooProductDetail, {
  name: 'woo-product',
  maxAge: 30,
  // Expirée = redemandée tout de suite (le swr s'additionnerait au cache de la route)
  swr: false,
  getKey: (slug: string) => slug,
})

async function fetchWooProductDetail(slug: string): Promise<{ detail: ProductDetail; relatedIds: number[] } | undefined> {
  const [wc] = await wooFetch<WooProductFull[]>('/products', {
    query: {
      slug,
      status: 'publish',
      _fields: `${wooProductFields},short_description,description,stock_status,categories,related_ids`,
    },
  })
  if (!wc) return

  const description = toParagraphs(wc.description)
  const category = wc.categories.find(c => !hiddenCategories.has(c.slug))

  return {
    relatedIds: wc.related_ids,
    detail: {
      ...toProduct(wc),
      brand: 'Vestige',
      images: wc.images.length ? wc.images.map(image => image.src) : ['/images/products/placeholder.svg'],
      summary: toParagraphs(wc.short_description).join(' ') || description[0] || '',
      inStock: wc.stock_status !== 'outofstock',
      category: category ? { label: decodeEntities(category.name), to: `/c/${category.slug}` } : { label: 'Boutique', to: '/' },
      details: description.length ? [{ title: 'Description', content: description.length > 1 ? description : description[0]! }] : [],
    },
  }
}

export async function wooProductsByIds(ids: number[]) {
  if (!ids.length) return []
  const products = await wooFetch<WooProduct[]>('/products', {
    query: { include: ids.join(','), status: 'publish', per_page: ids.length, _fields: wooProductFields },
  })
  return products.map(toProduct)
}

interface WooReview {
  id: number
  date_created: string
  reviewer: string
  review: string
  rating: number
  verified: boolean
}

// Avis approuvés d'un produit, les plus récents d'abord
export async function wooProductReviews(productId: number): Promise<Review[]> {
  const reviews = await wooFetch<WooReview[]>('/products/reviews', {
    query: { product: productId, status: 'approved', per_page: 20, _fields: 'id,date_created,reviewer,review,rating,verified' },
  })
  return reviews.map(review => ({
    id: review.id,
    // Balises retirées du nom : affiché comme texte, jamais comme HTML
    name: decodeEntities(review.reviewer).replace(/<[^>]*>/g, '').trim(),
    rating: review.rating,
    comment: toParagraphs(review.review).join('\n'),
    date: review.date_created,
    verified: review.verified,
  }))
}

// Nouvel avis : toujours « en attente », publié seulement après validation dans l'admin
export function wooCreateReview(productId: number, form: ReviewForm) {
  const { woocommerce } = useRuntimeConfig()
  return wooFetch('/products/reviews', {
    method: 'POST',
    body: {
      product_id: productId,
      reviewer: form.name.trim(),
      // WooCommerce exige un e-mail : adresse technique si le client n'en donne pas
      reviewer_email: form.email.trim() || `avis-sans-email@${new URL(woocommerce.url).hostname}`,
      review: form.comment.trim(),
      rating: form.rating,
      status: 'hold',
    },
  })
}
