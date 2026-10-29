import type { ListingResult } from '#shared/utils/listing'

// Liste de produits pilotée par l'URL : filtres, tri et page sont dans route.query
export function useListing(source: { category?: MaybeRefOrGetter<string>; q?: MaybeRefOrGetter<string> }) {
  const route = useRoute()
  const query = computed(() => ({ ...route.query, category: toValue(source.category), q: toValue(source.q) }))

  // Lazy : la page s'ouvre tout de suite avec un spinner (rendu serveur complet au premier chargement)
  // Clé fixe par catégorie / recherche : les anciens résultats restent affichés pendant le rechargement
  return useLazyFetch<ListingResult>('/api/listing', {
    query,
    key: () => `listing-${toValue(source.category) ?? ''}-${toValue(source.q) ?? ''}`,
  })
}

// Lecture et modification des filtres dans l'URL
export function useListingFilters() {
  const route = useRoute()
  const router = useRouter()
  const filters = computed(() => parseListingFilters(route.query))

  // Tout changement de filtre ou de tri revient à la page 1
  function update(patch: Record<string, string | undefined>) {
    const query: Record<string, string> = {}
    for (const [key, value] of Object.entries({ ...route.query, ...patch, page: patch.page })) {
      if (value !== undefined && value !== null && value !== '') query[key] = String(value)
    }
    return router.push({ query })
  }

  // Garde uniquement la recherche en cours
  function clear() {
    return router.push({ query: route.query.q ? { q: String(route.query.q) } : {} })
  }

  return { filters, update, clear }
}
