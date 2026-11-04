// Lecture des champs ACF renvoyés par l'API WordPress (acf_format=standard), avec valeur de repli
export type AcfFields = Record<string, unknown>

export const acf = {
  // Groupe ACF → objet de champs ({} si absent)
  group: (value: unknown): AcfFields => (value && typeof value === 'object' && !Array.isArray(value) ? value as AcfFields : {}),
  // Texte : la valeur de repli remplace un champ vide
  text: (value: unknown, fallback: string) => (typeof value === 'string' && value.trim() ? value.trim() : fallback),
  // Champ image ACF (format « array ») : { url, … } ; vide = false ou null
  image: (value: unknown, fallback: string) => {
    const url = acf.group(value).url
    return typeof url === 'string' && url ? url : fallback
  },
}
