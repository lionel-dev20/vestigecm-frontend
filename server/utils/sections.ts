import type { Category } from '#shared/types/category'
import type { Product } from '#shared/types/product'
import type { WooProduct } from './woocommerce'

// Sections produits de l'accueil : WooCommerce s'il est configuré, sinon le catalogue d'exemple
// Bons plans = produits en promotion · Santé et Agriculture = catégories WooCommerce de même slug
const sections = {
  deals: { sample: () => dealProducts, woo: () => wooFetch<WooProduct[]>('/products', { query: { status: 'publish', on_sale: 'true', per_page: 12, _fields: wooProductFields } }).then(list => list.map(toProduct)) },
  health: { sample: () => healthProducts, woo: () => wooProductsInCategory('sante') },
  agri: { sample: () => agriProducts, woo: () => wooProductsInCategory('agriculture') },
}

export function sectionProducts(section: keyof typeof sections): Promise<Product[]> | Product[] {
  return isWooConfigured() ? sections[section].woo() : sections[section].sample()
}

const sampleImage = '/images/products/placeholder.svg'
const sampleCategories: Category[] = [
  { id: 'complements', name: 'Compléments', to: '/c/complements', image: sampleImage, count: 52 },
  { id: 'soins-peau', name: 'Soins de la peau', to: '/c/soins-peau', image: sampleImage, count: 48 },
  { id: 'kits-maladies', name: 'Kits maladies', to: '/c/kit-maladies', image: sampleImage, count: 9 },
  { id: 'agriculture', name: 'Agriculture', to: '/c/agriculture', image: sampleImage, count: 36 },
]

// « Acheter par catégorie » : catégories principales WooCommerce (image et nombre de produits)
export async function shopCategories(): Promise<Category[]> {
  if (!isWooConfigured()) return sampleCategories
  const categories = await wooCategories()
  return categories
    .filter(category => category.parent === 0)
    .map(category => ({
      id: category.slug,
      name: decodeEntities(category.name),
      to: `/c/${category.slug}`,
      image: category.image?.src ?? sampleImage,
      count: category.count,
    }))
}
