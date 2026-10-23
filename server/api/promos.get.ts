import type { Promo } from '#shared/types/promo'

// Le premier élément occupe la grande carte, les 2 suivants la colonne de droite
const promos: Promo[] = [
  {
    title: 'Jusqu\'à -20%',
    subtitle: 'Les compléments que les experts prennent chaque jour',
    to: '/c/nutrition',
    image: '/images/hero/featured.jpg',
    bg: '#e7e3dc',
  },
  {
    title: '-20% sur Metagenics',
    subtitle: 'Des formules innovantes appuyées par la science',
    to: '/c/brandhub',
    image: '/images/hero/promo-1.jpg',
    bg: '#2f5f9e',
    tone: 'light',
  },
  {
    title: 'Notre promesse qualité',
    subtitle: 'Des produits authentiques, des standards de confiance',
    to: '/qualite',
    image: '/images/hero/promo-2.jpg',
    bg: '#f2f2f0',
  },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => promos)
