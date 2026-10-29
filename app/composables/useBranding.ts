import type { Branding } from '#shared/types/branding'

// Une seule requête partagée (clé fixe) entre le header et la balise <head>
export function useBranding() {
  return useFetch<Branding>('/api/branding', { key: 'branding' })
}
