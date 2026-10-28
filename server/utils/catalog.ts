import type { Product } from '#shared/types/product'

const image = '/images/products/placeholder.svg'

// Catalogue d'exemple : à remplacer par la base de données / le CMS
export const dealProducts: Product[] = [
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
export const healthProducts: Product[] = [
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
export const agriProducts: Product[] = [
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