// Fond de carte : couleur de secours + image optimisée (WebP, largeur adaptée)
export function useCardBackground(source: () => { image: string; bg: string }, width: number) {
  const img = useImage()

  return computed(() => ({
    backgroundColor: source().bg,
    backgroundImage: `url('${img(source().image, { width, format: 'webp' })}')`,
  }))
}
