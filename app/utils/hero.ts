// Largeur de l'image de fond (×2 pour les écrans Retina), aussi utilisée par le preload
export function heroImageWidth(featured?: boolean) {
  return featured ? 1800 : 900
}

// Dimensions partagées par la carte et son skeleton : aucun saut de mise en page
// Hauteur plafonnée à 480px (max-h-120 / lg:h-120 sur la grille)
export function heroCardSize(featured?: boolean) {
  return featured
    ? 'aspect-4/5 max-h-120 w-full p-6 sm:aspect-16/10 sm:p-10 lg:aspect-auto lg:p-12'
    : 'aspect-4/3 p-6 lg:aspect-auto'
}
