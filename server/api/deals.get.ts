import type { Product } from '#shared/types/product'

const image = '/images/products/placeholder.svg'

const deals: Product[] = [
  { id: 'dha-bebe', name: 'DHA liquide pour bébé, oméga-3 avec vitamine D3, 59 ml', to: '/p/dha-bebe', image, rating: 4.5, reviews: 31965, price: 5610, oldPrice: 9349 },
  { id: 'trousse-beaute', name: 'Trousse beauté éclat, coffret découverte 8 pièces', to: '/p/trousse-beaute', image, rating: 5, reviews: 278, price: 15539, oldPrice: 31077 },
  { id: 'kit-cheveux', name: 'Kit réparateur cheveux à la kératine, 4 produits', to: '/p/kit-cheveux', image, rating: 4.5, reviews: 1572, price: 9193, oldPrice: 18385 },
  { id: 'sureau', name: 'Sirop de sureau noir pour adultes, 240 ml', to: '/p/sureau', image, rating: 4.5, reviews: 247, price: 3556, oldPrice: 9130 },
  { id: 'gummies-fer', name: 'Gummies vitaminés au fer pour enfants dès 3 ans, mûre', to: '/p/gummies-fer', image, rating: 4.5, reviews: 2136, price: 4566, oldPrice: 11564 },
  { id: 'gummies-multi', name: 'Gummies multivitamines + 4 légumes pour enfants', to: '/p/gummies-multi', image, rating: 4.5, reviews: 3487, price: 4547, oldPrice: 11550 },
  { id: 'collagene', name: 'Collagène marin en poudre, sans arôme, 200 g', to: '/p/collagene', image, rating: 4.5, reviews: 8412, price: 12300, oldPrice: 16400 },
  { id: 'vitamine-c', name: 'Vitamine C 1000 mg, 60 comprimés', to: '/p/vitamine-c', image, rating: 4, reviews: 5120, price: 3900, oldPrice: 5200 },
  { id: 'magnesium', name: 'Magnésium bisglycinate, 120 gélules végétales', to: '/p/magnesium', image, rating: 4.5, reviews: 12044, price: 7450 },
  { id: 'kit-paludisme', name: 'Kit de prévention paludisme, moustiquaire + répulsif', to: '/p/kit-paludisme', image, rating: 4, reviews: 389, price: 8900, oldPrice: 11000 },
  { id: 'engrais-bio', name: 'Engrais organique universel, sac de 5 kg', to: '/p/engrais-bio', image, rating: 4.5, reviews: 642, price: 6500, oldPrice: 7800 },
  { id: 'semences-tomate', name: 'Semences de tomate hybride, sachet de 500 graines', to: '/p/semences-tomate', image, rating: 4, reviews: 215, price: 2500 },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => deals)
