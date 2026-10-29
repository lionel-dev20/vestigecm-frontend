import type { Product, ProductDetail } from '#shared/types/product'

const productKey = (slug: string) => `product-${slug}`

// Heure de réception de chaque fiche, pour ne pas redemander une fiche toute fraîche
const receivedAt = new Map<string, number>()
const isFresh = (key: string) => Date.now() - (receivedAt.get(key) ?? 0) < 15_000

// Fiche produit : rendue côté serveur au premier chargement ; en navigation, la page s'ouvre
// sans attendre (lazy) et réutilise les données préchargées au survol / toucher de la carte
export function useProduct(slug: MaybeRefOrGetter<string>) {
  const nuxtApp = useNuxtApp()
  const result = useLazyFetch<ProductDetail>(() => `/api/products/${toValue(slug)}`, {
    key: () => productKey(toValue(slug)),
    // Données en mémoire seulement à l'affichage : un refresh() doit toujours redemander au serveur
    getCachedData: (key, app, ctx) => (ctx.cause === 'refresh:manual' || ctx.cause === 'refresh:hook'
      ? undefined
      : app.payload.data[key] ?? app.static.data[key]),
  })

  // Fiche déjà en mémoire (préchargée ou déjà vue) : affichée tout de suite, puis rafraîchie
  // en arrière-plan pour que la note, le stock et le prix soient à jour sans recharger la page
  const key = productKey(toValue(slug))
  if (import.meta.client && !nuxtApp.isHydrating && result.data.value && !isFresh(key)) {
    result.refresh().then(() => receivedAt.set(key, Date.now()))
  }

  return result
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
    .then((detail) => {
      nuxtApp.payload.data[key] = detail
      receivedAt.set(key, Date.now())
    })
    .catch(() => {})
    .finally(() => prefetching.delete(key))
}
