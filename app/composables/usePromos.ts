// Lazy : rendu serveur complet au 1er chargement, skeleton lors d'une navigation client
export function usePromos() {
  return useLazyFetch('/api/promos', { key: 'promos', default: () => [] })
}
