export interface ShowcaseItem {
  title: string
  subtitle?: string
  // Texte du bouton sous l'image
  cta: string
  to: string
  image: string
  // Couleur affichée tant que l'image n'est pas chargée
  bg: string
  // Texte clair sur image sombre
  tone?: 'dark' | 'light'
}
