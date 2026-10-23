import type { ShowcaseItem } from '#shared/types/showcase'

const items: ShowcaseItem[] = [
  {
    title: 'Routine beauté',
    subtitle: 'Notre nouvelle gamme de soins',
    cta: 'Explorer la gamme',
    to: '/c/beaute',
    image: '/images/showcase/card-1.jpg',
    bg: '#c9b39b',
    tone: 'light',
  },
  {
    title: 'Testé en laboratoire',
    subtitle: 'Pureté vérifiée à chaque lot',
    cta: 'Voir les compléments',
    to: '/c/nutrition',
    image: '/images/showcase/card-2.jpg',
    bg: '#1d2430',
    tone: 'light',
  },
  {
    title: 'Agriculture',
    subtitle: 'Des solutions pour vos cultures',
    cta: 'Voir l\'agriculture',
    to: '/c/agriculture',
    image: '/images/showcase/card-3.jpg',
    bg: '#2c3b2a',
    tone: 'light',
  },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => items)
