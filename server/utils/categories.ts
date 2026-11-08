import type { Product } from '#shared/types/product'

interface CategoryDef {
  slug: string
  title: string
  description: string
  products: () => Product[]
}

// Catégories d'exemple : remplacées par les catégories WooCommerce une fois configuré
const categoryDefs: CategoryDef[] = [
  { slug: 'produits', title: 'Tous nos produits', description: 'L\'ensemble de nos produits naturels pour la santé, la beauté et l\'agriculture.', products: catalogProducts },
  { slug: 'all-offers', title: 'Bons plans', description: 'Nos produits à prix réduit, pour un temps limité.', products: () => catalogProducts().filter(product => product.oldPrice) },
  { slug: 'sante', title: 'Santé et beauté', description: 'Compléments naturels, soins et produits du quotidien pour votre bien-être.', products: () => healthProducts },
  { slug: 'complements', title: 'Compléments alimentaires', description: 'Vitamines, minéraux et plantes pour soutenir votre organisme.', products: () => [...healthProducts, ...dealProducts.filter(p => !p.to.includes('engrais') && !p.to.includes('semences'))] },
  { slug: 'kits-traitement', title: 'Kits traitement', description: 'Des kits de compléments naturels, avec leur posologie, pour accompagner chaque besoin.', products: () => healthProducts },
  { slug: 'agriculture', title: 'Agriculture', description: 'Engrais, semences et traitements naturels pour des cultures saines et productives.', products: () => agriProducts },
]

// Sous-catégories des univers du header (mêmes slugs que les catégories WooCommerce importées)
const subcategories: [string, string, () => Product[]][] = [
  ['produits-ayurvediques', 'Produits ayurvédiques', () => healthProducts],
  ['kits-adhesion', 'Kits d\'adhésion', () => healthProducts],
  ['minceur', 'Minceur', () => healthProducts],
  ['soins-visage-corps', 'Soins du visage et du corps', () => dealProducts],
  ['hygiene-bucco-dentaire', 'Hygiène bucco-dentaire', () => dealProducts],
  ['alimentation-saine', 'Alimentation saine', () => healthProducts],
  ['entretien-maison', 'Entretien de la maison', () => dealProducts],
  ['activateurs-croissance', 'Activateurs de croissance', () => agriProducts],
  ['amendements-sol', 'Amendements du sol', () => agriProducts],
]
categoryDefs.push(...subcategories.map(([slug, title, products]) => ({ slug, title, description: '', products })))

export const categoryLinks = categoryDefs.map(category => ({ label: category.title, to: `/c/${category.slug}` }))

// « sante/minceur » : catégorie exacte, sinon sa catégorie parente
export function findCategory(path: string) {
  const parent = path.split('/')[0]
  return categoryDefs.find(category => category.slug === path) ?? categoryDefs.find(category => category.slug === parent)
}
