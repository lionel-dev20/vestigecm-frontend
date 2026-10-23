import type { Product } from '#shared/types/product'

const image = '/images/products/placeholder.svg'

const picks: Product[] = [
  { id: 'spiruline', name: 'Spiruline, 60 gélules végétales', to: '/p/spiruline', image, rating: 4.6, reviews: 9454, price: 14917 },
  { id: 'noni', name: 'Jus de noni, 1 litre', to: '/p/noni', image, rating: 4.5, reviews: 409, price: 17470, oldPrice: 19900 },
  { id: 'aloe-vera', name: 'Gel d\'aloe vera à boire, 1 litre', to: '/p/aloe-vera', image, rating: 4.6, reviews: 35666, price: 7479 },
  { id: 'collagene-sante', name: 'Collagène marin en poudre, sans arôme, 200 g', to: '/p/collagene', image, rating: 4.8, reviews: 37864, price: 25726, oldPrice: 29500 },
  { id: 'vitamine-b', name: 'Complexe de vitamines B, 60 gélules', to: '/p/vitamine-b', image, rating: 4.8, reviews: 115227, price: 6587 },
  { id: 'moringa', name: 'Moringa en poudre, 100 % naturel, 250 g', to: '/p/moringa', image, rating: 4.7, reviews: 1551, price: 8550 },
  { id: 'omega-3', name: 'Oméga-3 huile de poisson, 90 capsules', to: '/p/omega-3', image, rating: 4.7, reviews: 20418, price: 11200, oldPrice: 13000 },
  { id: 'ginseng', name: 'Ginseng rouge, énergie et vitalité, 60 gélules', to: '/p/ginseng', image, rating: 4.5, reviews: 3290, price: 13650 },
  { id: 'curcuma', name: 'Curcuma et poivre noir, 90 comprimés', to: '/p/curcuma', image, rating: 4.6, reviews: 18734, price: 9800 },
  { id: 'ail-noir', name: 'Ail noir fermenté, tension et cholestérol, 60 gélules', to: '/p/ail-noir', image, rating: 4.4, reviews: 862, price: 10500 },
  { id: 'zinc', name: 'Zinc et vitamine C, défenses naturelles, 60 comprimés', to: '/p/zinc', image, rating: 4.7, reviews: 6120, price: 5200 },
  { id: 'fibres', name: 'Fibres naturelles, transit et ventre plat, 300 g', to: '/p/fibres', image, rating: 4.5, reviews: 2475, price: 12400 },
]

// Cache : voir routeRules (production) dans nuxt.config.ts
export default defineEventHandler(() => picks)
