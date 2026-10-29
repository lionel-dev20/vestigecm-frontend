import type { HealthKit } from './health-kit'
import type { Promo } from './promo'
import type { ShowcaseItem } from './showcase'

// Contenu de la page d'accueil, géré dans WordPress avec ACF (page « Accueil »)
export interface HomeLinkSection {
  title: string
  to: string
}

export interface HomeDealCard {
  badge: string
  title: string
  highlight: string
  text: string
  cta: string
  to: string
  image: string
  tone: 'light' | 'dark'
}

export interface HomeContent {
  hero: Promo[]
  whatsapp: { title: string; label: string; to: string }
  quality: { title: string; text: string; cards: ShowcaseItem[] }
  deals: HomeLinkSection
  health: {
    title: string
    label: string
    to: string
    intro: string
    image: string
    features: { icon: string; text: string }[]
    kits: HealthKit[]
  }
  banner: { title: string; subtitle: string; cta: string; to: string; image: string }
  healthPicks: HomeLinkSection
  categories: { eyebrow: string; title: string; highlight: string }
  agriPicks: HomeLinkSection
  dealCards: HomeDealCard[]
  cta: { eyebrow: string; title: string; highlight: string; text: string; cta: string; to: string; image: string }
  // html : texte enrichi déjà nettoyé côté serveur
  about: { title: string; html: string; address: string; whatsapp: string }
}
