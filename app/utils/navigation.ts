export interface NavLink {
  label: string
  to: string
  icon?: string
}

// Onglets principaux (pilule active)
export const sectionTabs: NavLink[] = [
  { label: 'Beauté et santé', to: '/' },
  { label: 'kit des maladies', to: '/c/clothing' },
  { label: 'Agriculture', to: '/c/brandhub' },
]

// Barre de catégories sous l'en-tête
export const categoryLinks: NavLink[] = [
  { label: 'Advent', to: '/c/gifting-hub/advent', icon: 'i-lucide-gift' },
  { label: 'Trending', to: '/c/all-offers/trending-products' },
  { label: 'Protein', to: '/c/nutrition/protein' },
  { label: 'Supplements', to: '/c/nutrition' },
  { label: 'Vitamins', to: '/c/nutrition/vitamins' },
  { label: 'Bars, Snacks & Foods', to: '/c/nutrition/healthy-food-drinks' },
  { label: 'Accessories', to: '/c/nutrition/accessories' },
  { label: 'Collabs', to: '/c/partnerships/collaborations' },
  { label: 'Clearance', to: '/c/all-offers/clearance-multibuy' },
  { label: 'Expert Advice', to: '/thezone' },
]
