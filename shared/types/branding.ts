// Identité du site gérée dans WordPress (script vestige-headless : /wp-json/vestige/v1/branding)
export interface Branding {
  name: string
  description: string
  logo: { url: string; width: number; height: number; alt: string } | null
  // Favicon en plusieurs tailles : onglet (32), iPhone (180), Android (192, 512)
  favicon: Record<'32' | '180' | '192' | '512', string> | null
}
