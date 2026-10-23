import type { Category } from '#shared/types/category'

const image = '/images/products/placeholder.svg'

const categories: Category[] = [
  { id: 'complements', name: 'Compléments', to: '/c/complements', image, count: 52 },
  { id: 'soins-peau', name: 'Soins de la peau', to: '/c/soins-peau', image, count: 48 },
  { id: 'cheveux', name: 'Soins des cheveux', to: '/c/cheveux', image, count: 30 },
  { id: 'immunite', name: 'Immunité', to: '/c/immunite', image, count: 27 },
  { id: 'minceur', name: 'Minceur', to: '/c/minceur', image, count: 21 },
  { id: 'kits-maladies', name: 'Kits maladies', to: '/c/kit-maladies', image, count: 9 },
  { id: 'agriculture', name: 'Agriculture', to: '/c/agriculture', image, count: 36 },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => categories)
