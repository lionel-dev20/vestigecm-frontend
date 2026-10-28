import type { Product, ProductDetail } from '#shared/types/product'

const groups = [
  { products: () => dealProducts, category: { label: 'Bons plans', to: '/c/all-offers' } },
  { products: () => healthProducts, category: { label: 'Beauté et santé', to: '/' } },
  { products: () => agriProducts, category: { label: 'Agriculture', to: '/c/agriculture' } },
]

const slugOf = (product: Product) => product.to.split('/').pop()

// Cherche un produit par slug et complète sa fiche (contenu d'exemple)
export function findProductDetail(slug: string): ProductDetail | undefined {
  for (const group of groups) {
    const product = group.products().find(p => slugOf(p) === slug)
    if (!product) continue

    return {
      ...product,
      brand: 'Vestige',
      images: [product.image, product.image, product.image, product.image],
      summary: 'Formule naturelle issue de la tradition ayurvédique, pour accompagner votre bien-être au quotidien.',
      inStock: true,
      category: group.category,
      details: [
        { title: 'Description', content: 'Un produit sélectionné pour sa qualité et sa traçabilité, fabriqué selon les bonnes pratiques de fabrication (BPF).' },
        { title: 'Bienfaits', content: ['Soutient l\'énergie et la vitalité', 'Contribue au bon fonctionnement de l\'organisme', 'Ingrédients d\'origine naturelle'] },
        { title: 'Conseils d\'utilisation', content: 'Prendre 1 à 2 doses par jour, de préférence au cours d\'un repas, avec un grand verre d\'eau.' },
        { title: 'Précautions', content: 'Ne pas dépasser la dose journalière recommandée. Demandez l\'avis d\'un professionnel de santé en cas de grossesse, d\'allaitement ou de traitement en cours.' },
      ],
    }
  }
}

// Produits de la même famille, sans le produit courant
export function findRelatedProducts(slug: string, limit = 12): Product[] {
  const group = groups.find(g => g.products().some(p => slugOf(p) === slug)) ?? groups[0]!
  return group.products().filter(p => slugOf(p) !== slug).slice(0, limit)
}

// Fiche produit : WooCommerce s'il est configuré, sinon le catalogue d'exemple
export async function getProductDetail(slug: string) {
  if (!isWooConfigured()) return findProductDetail(slug)
  return (await wooProductDetail(slug))?.detail
}

// Produits liés : ceux choisis par WooCommerce (ventes croisées, même catégorie)
export async function getRelatedProducts(slug: string) {
  if (!isWooConfigured()) return findRelatedProducts(slug)
  const product = await wooProductDetail(slug)
  return product ? wooProductsByIds(product.relatedIds.slice(0, 12)) : []
}
