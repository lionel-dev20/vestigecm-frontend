import type { Product } from '../types/product'

// Tris proposés : clé dans l'URL (?tri=) → libellé affiché
export const listingSorts = {
  relevance: 'Pertinence',
  popularity: 'Meilleures ventes',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  rating: 'Mieux notés',
} as const

export type ListingSort = keyof typeof listingSorts

// 40 produits par page = 10 rangées de 4 sur bureau
export const listingPerPage = 40

// Filtres lus dans l'URL : /c/sante?promo=1&note=4&min=5000&max=20000&tri=price-asc&page=2
export interface ListingFilters {
  sort: ListingSort
  page: number
  promo: boolean
  rating: number
  min?: number
  max?: number
}

export interface ListingResult {
  title: string
  description?: string
  products: Product[]
  total: number
  page: number
  pageCount: number
  // Infos pour construire les filtres (absentes si la source ne les fournit pas)
  priceRange: { min: number; max: number } | null
  promoCount: number | null
  categories: { label: string; to: string }[]
}

type RawQuery = Record<string, unknown>

const positive = (value: unknown) => {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : undefined
}

export function parseListingFilters(query: RawQuery): ListingFilters {
  const sort = String(query.tri ?? '')
  return {
    sort: sort in listingSorts ? sort as ListingSort : 'relevance',
    page: positive(query.page) ?? 1,
    promo: query.promo === '1',
    rating: Math.min(positive(query.note) ?? 0, 5),
    min: positive(query.min),
    max: positive(query.max),
  }
}

// Nombre de filtres actifs (hors tri et page), pour le bouton « Filtrer » mobile
export function countActiveFilters(filters: ListingFilters) {
  return [filters.promo, filters.rating > 0, filters.min, filters.max].filter(Boolean).length
}
