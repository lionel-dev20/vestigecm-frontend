import type { Product, ProductDetail } from '#shared/types/product'

const productKey = (slug: string) => `product-${slug}`

// Fiche produit : rendue côté serveur au premier chargement ; en navigation, la page s'ouvre
// sans attendre (lazy) et réutilise les données préchargées au survol / toucher de la carte
export function useProduct(slug: MaybeRefOrGetter<string>) {
  return useLazyFetch<ProductDetail>(() => `/api/products/${toValue(slug)}`, {
    key: () => productKey(toValue(slug)),
    getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
  })
}

// Produits similaires : à la demande, à l'approche du scroll
export function useRelatedProducts(slug: MaybeRefOrGetter<string>) {
  return useLazyFetch(() => `/api/products/${toValue(slug)}/related`, {
    key: () => `related-${toValue(slug)}`,
    immediate: false,
    server: false,
    default: () => [],
  })
}

// Carte cliquée : ses infos (nom, prix, photo) s'affichent immédiatement sur la fiche
export const useProductPreview = () => useState<Product | null>('product-preview', () => null)

// Précharge la fiche avant le clic ; une seule requête par produit
const prefetching = new Set<string>()
// nuxtApp récupéré dans le setup du composant appelant (l'appel a lieu plus tard, dans un événement)
export function prefetchProduct(to: string, nuxtApp = useNuxtApp()) {
  const slug = to.split('/').pop() ?? ''
  const key = productKey(slug)
  if (!slug || nuxtApp.payload.data[key] || prefetching.has(key)) return

  prefetching.add(key)
  $fetch<ProductDetail>(`/api/products/${slug}`)
    .then((detail) => { nuxtApp.payload.data[key] = detail })
    .catch(() => {})
    .finally(() => prefetching.delete(key))
}
