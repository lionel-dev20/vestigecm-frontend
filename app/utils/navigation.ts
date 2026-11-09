export interface NavLink {
  label: string
  to: string
  icon?: string
  children?: NavLink[]
}

// Univers de l'en-tête (pilules) et leurs sous-catégories directes (barre sous l'en-tête)
// Même structure que les menus WordPress importés (data/import/1-categories-et-menus.xml)
export const sectionTabs: NavLink[] = [
  {
    label: 'Santé et beauté',
    to: '/c/sante',
    children: [
      { label: 'Produits ayurvédiques', to: '/c/produits-ayurvediques' },
      { label: 'Minceur', to: '/c/minceur' },
      { label: 'Soins du visage et du corps', to: '/c/soins-visage-corps' },
      { label: 'Hygiène bucco-dentaire', to: '/c/hygiene-bucco-dentaire' },
      { label: 'Alimentation saine', to: '/c/alimentation-saine' },
      { label: 'Entretien de la maison', to: '/c/entretien-maison' },
    ],
  },
  // Kits : un produit WooCommerce par kit, directement dans la catégorie (pas de sous-menu)
  { label: 'Kits traitement', to: '/c/kits-traitement' },
  {
    label: 'Bilans et thérapies',
    to: '/bilans-therapies',
    children: services.map(service => ({ label: service.label, to: `/bilans-therapies#${service.id}` })),
  },
  {
    label: 'Agriculture',
    to: '/c/agriculture',
    children: [
      { label: 'Activateurs de croissance', to: '/c/activateurs-croissance' },
      { label: 'Amendements du sol', to: '/c/amendements-sol' },
    ],
  },
  { label: 'Témoignages', to: '/temoignages' },
  // Carrière : devenir distributeur, avec les kits d'adhésion
  {
    label: 'Carrière',
    to: '/carriere',
    children: [
      { label: 'Devenir distributeur', to: '/carriere' },
      { label: 'Kits d\'adhésion', to: '/c/kits-adhesion' },
    ],
  },
]

const within = (path: string, link: NavLink) => path === link.to || path.startsWith(`${link.to}/`)

// Univers de la page : l'univers lui-même ou l'une de ses sous-catégories ; le premier sur l'accueil
export function activeSection(path: string) {
  return sectionTabs.find(tab => within(path, tab) || tab.children?.some(child => within(path, child)))
    ?? (path === '/' ? sectionTabs[0] : undefined)
}
