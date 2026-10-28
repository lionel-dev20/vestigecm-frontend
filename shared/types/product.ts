export interface Product {
  id: string
  name: string
  to: string
  image: string
  // Note sur 5 et nombre d'avis
  rating: number
  reviews: number
  // Prix en FCFA ; oldPrice = prix barré
  price: number
  oldPrice?: number
}

// Fiche produit complète (prix unique, pas de variantes)
export interface ProductDetail extends Product {
  brand: string
  images: string[]
  summary: string
  inStock: boolean
  category: { label: string; to: string }
  // Sections dépliables de la fiche
  details: { title: string; content: string | string[] }[]
}
