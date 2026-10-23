// Découpe un titre autour de la partie à mettre en couleur
export function splitHighlight(title: string, highlight?: string) {
  const index = highlight ? title.indexOf(highlight) : -1
  if (!highlight || index < 0) return { before: title, accent: '', after: '' }
  return {
    before: title.slice(0, index),
    accent: highlight,
    after: title.slice(index + highlight.length),
  }
}
