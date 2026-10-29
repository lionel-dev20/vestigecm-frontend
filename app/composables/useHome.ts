import type { HomeContent } from '#shared/types/home'

// Contenu de la page d'accueil géré dans WordPress (ACF) ; rendu côté serveur
export function useHome() {
  return useFetch<HomeContent>('/api/home', { key: 'home' })
}
