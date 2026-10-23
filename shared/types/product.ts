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
