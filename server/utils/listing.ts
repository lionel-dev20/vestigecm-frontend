import type { Product } from '#shared/types/product'
import type { ListingFilters, ListingResult, ListingSort } from '#shared/utils/listing'
import type { WooProduct } from './woocommerce'

interface ListingSource {
  category?: string
  q?: string
}

const sorters: Record<ListingSort, (a: Product, b: Product) => number> = {
  relevance: () => 0,
  popularity: (a, b) => b.reviews - a.reviews,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
}

const searchTitle = (q?: string) => (q ? `Résultats pour « ${q} »` : 'Rechercher un produit')

// Liste paginée et filtrée : WooCommerce s'il est configuré, sinon le catalogue d'exemple
export function listProducts(filters: ListingFilters, source: ListingSource): Promise<ListingResult> | ListingResult {
  return isWooConfigured() ? wooListing(filters, source) : localListing(filters, source)
}

function localListing(filters: ListingFilters, { category, q }: ListingSource): ListingResult {
  let products: Product[]
  let title: string
  let description: string | undefined

  if (category) {
    const def = findCategory(category)
    if (!def) throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
    ;({ title, description } = def)
    products = def.products()
  }
  else {
    title = searchTitle(q)
    products = q && q.length >= 2 ? catalogProducts().filter(product => matchesQuery(product, q)) : []
  }

  // Bornes de prix et nombre de promos : calculés avant filtrage, pour construire les filtres
  const prices = products.map(product => product.price)
  const priceRange = prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null
  const promoCount = products.filter(product => product.oldPrice).length

  const filtered = products
    .filter(product =>
      (!filters.promo || product.oldPrice)
      && product.rating >= filters.rating
      && (!filters.min || product.price >= filters.min)
      && (!filters.max || product.price <= filters.max))
    .sort(sorters[filters.sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / listingPerPage))
  const page = Math.min(filters.page, pageCount)

  return {
    title,
    description,
    products: filtered.slice((page - 1) * listingPerPage, page * listingPerPage),
    total: filtered.length,
    page,
    pageCount,
    priceRange,
    promoCount,
    categories: categoryLinks,
  }
}

async function wooListing(filters: ListingFilters, { category, q }: ListingSource): Promise<ListingResult> {
  let title = searchTitle(q)
  let description: string | undefined
  let categoryId: number | undefined

  // Liens « Catégories » des filtres : catégories principales de la boutique
  const categories = (await shopCategories()).map(c => ({ label: c.name, to: c.to }))

  if (category) {
    const found = await wooCategoryBySlug(category.split('/').pop() ?? '')
    if (!found) throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
    categoryId = found.id
    title = decodeEntities(found.name)
    description = found.description.replace(/<[^>]+>/g, '').trim() || undefined
  }
  else if (!q || q.length < 2) {
    return { title, products: [], total: 0, page: 1, pageCount: 1, priceRange: null, promoCount: null, categories }
  }

  const orderby: Record<ListingSort, string> = {
    relevance: q ? 'relevance' : 'menu_order',
    popularity: 'popularity',
    'price-asc': 'price',
    'price-desc': 'price',
    rating: 'rating',
  }

  const response = await wooFetchRaw<WooProduct[]>('/products', {
    query: {
      status: 'publish',
      per_page: listingPerPage,
      page: filters.page,
      search: q,
      category: categoryId,
      orderby: orderby[filters.sort],
      order: filters.sort === 'price-asc' ? 'asc' : 'desc',
      on_sale: filters.promo ? 'true' : undefined,
      min_price: filters.min,
      max_price: filters.max,
      _fields: wooProductFields,
    },
  })

  // L'API WooCommerce ne filtre pas par note : filtre appliqué sur la page reçue
  const products = (response._data ?? []).map(toProduct).filter(product => product.rating >= filters.rating)

  return {
    title,
    description,
    products,
    total: Number(response.headers.get('x-wp-total')) || products.length,
    page: filters.page,
    pageCount: Number(response.headers.get('x-wp-totalpages')) || 1,
    priceRange: null,
    promoCount: null,
    categories,
  }
}
