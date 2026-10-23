export interface Promo {
  title: string
  subtitle: string
  to: string
  image: string
  // Couleur affichée tant que l'image n'est pas chargée
  bg: string
  // Texte clair sur image sombre
  tone?: 'dark' | 'light'
}
