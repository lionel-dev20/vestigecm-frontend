import type { Product } from '#shared/types/product'

const image = '/images/products/placeholder.svg'

const products: Product[] = [
  { id: 'engrais-organique', name: 'Engrais organique universel, sac de 5 kg', to: '/p/engrais-organique', image, rating: 4.5, reviews: 642, price: 6500, oldPrice: 7800 },
  { id: 'semences-tomate', name: 'Semences de tomate hybride, sachet de 500 graines', to: '/p/semences-tomate', image, rating: 4.3, reviews: 215, price: 2500 },
  { id: 'biostimulant', name: 'Biostimulant foliaire naturel, croissance et floraison, 1 litre', to: '/p/biostimulant', image, rating: 4.6, reviews: 388, price: 9800 },
  { id: 'compost', name: 'Compost enrichi pour potager, sac de 20 kg', to: '/p/compost', image, rating: 4.4, reviews: 517, price: 7200, oldPrice: 8500 },
  { id: 'insecticide-bio', name: 'Insecticide bio à l\'huile de neem, 500 ml', to: '/p/insecticide-bio', image, rating: 4.5, reviews: 931, price: 5400 },
  { id: 'semences-piment', name: 'Semences de piment, sachet de 300 graines', to: '/p/semences-piment', image, rating: 4.2, reviews: 142, price: 2000 },
  { id: 'fongicide-bio', name: 'Fongicide naturel à base de cuivre, 250 g', to: '/p/fongicide-bio', image, rating: 4.3, reviews: 276, price: 4800 },
  { id: 'engrais-cacao', name: 'Engrais spécial cacao et café, sac de 25 kg', to: '/p/engrais-cacao', image, rating: 4.6, reviews: 455, price: 18500, oldPrice: 21000 },
  { id: 'activateur-sol', name: 'Activateur de sol microbien, 1 kg', to: '/p/activateur-sol', image, rating: 4.4, reviews: 203, price: 8900 },
  { id: 'semences-mais', name: 'Semences de maïs à haut rendement, 1 kg', to: '/p/semences-mais', image, rating: 4.5, reviews: 612, price: 3500 },
  { id: 'pulverisateur', name: 'Pulvérisateur manuel à dos, 16 litres', to: '/p/pulverisateur', image, rating: 4.3, reviews: 389, price: 24000, oldPrice: 27500 },
  { id: 'aliment-volaille', name: 'Complément naturel pour volailles, 1 kg', to: '/p/aliment-volaille', image, rating: 4.4, reviews: 167, price: 6200 },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => products)
