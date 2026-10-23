import type { HealthKit } from '#shared/types/health-kit'

const image = '/images/products/placeholder.svg'

// Maladies les plus recherchées, dans l'ordre d'affichage
const kits: HealthKit[] = [
  { id: 'diabete', name: 'Diabète', cta: 'Voir le kit', to: '/c/kit-maladies/diabete', image },
  { id: 'faiblesse-sexuelle', name: 'Faiblesse / impuissance sexuelle', cta: 'Voir le kit', to: '/c/kit-maladies/faiblesse-sexuelle', image },
  { id: 'tension', name: 'Hypertension & hypotension', cta: 'Voir le kit', to: '/c/kit-maladies/tension', image },
  { id: 'avc-memoire', name: 'AVC & troubles de la mémoire', cta: 'Voir le kit', to: '/c/kit-maladies/avc-memoire', image },
  { id: 'arthrose', name: 'Arthrose, douleurs articulaires, rhumatismes', cta: 'Voir le kit', to: '/c/kit-maladies/arthrose', image },
  { id: 'prostate-fertilite', name: 'Prostate, infertilité, règles douloureuses', cta: 'Voir le kit', to: '/c/kit-maladies/prostate-fertilite', image },
  { id: 'hernie-migraine-anemie', name: 'Hernie discale, migraine, anémie', cta: 'Voir le kit', to: '/c/kit-maladies/hernie-migraine-anemie', image },
  { id: 'tumeurs-poumons', name: 'Tumeurs, cancers, infections pulmonaires', cta: 'Voir le kit', to: '/c/kit-maladies/tumeurs-poumons', image },
  { id: 'menopause-chroniques', name: 'Ménopause et autres maladies chroniques', cta: 'Voir le kit', to: '/c/kit-maladies/menopause-chroniques', image },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => kits)
