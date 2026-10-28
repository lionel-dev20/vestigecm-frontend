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
    label: 'Beauté et santé',
    to: '/c/sante',
    children: [
      { label: 'Immunité et vitalité', to: '/c/immunite-vitalite' },
      { label: 'Détox', to: '/c/detox' },
      { label: 'Minceur', to: '/c/minceur' },
      { label: 'Soins du visage et du corps', to: '/c/soins-visage-corps' },
      { label: 'Hygiène bucco-dentaire', to: '/c/hygiene-bucco-dentaire' },
      { label: 'Alimentation saine', to: '/c/alimentation-saine' },
      { label: 'Entretien de la maison', to: '/c/entretien-maison' },
    ],
  },
  {
    label: 'Kit des maladies',
    to: '/c/kit-maladies',
    children: [
      { label: 'Hypertension et cœur', to: '/c/hypertension-coeur' },
      { label: 'Diabète', to: '/c/diabete' },
      { label: 'Arthrose et articulations', to: '/c/arthrose-articulations' },
      { label: 'Santé du foie', to: '/c/sante-du-foie' },
      { label: 'Anémie et santé féminine', to: '/c/anemie-sante-feminine' },
      { label: 'Troubles digestifs', to: '/c/troubles-digestifs' },
      { label: 'Prostate', to: '/c/prostate' },
    ],
  },
  {
    label: 'Agriculture',
    to: '/c/agriculture',
    children: [
      { label: 'Activateurs de croissance', to: '/c/activateurs-croissance' },
      { label: 'Amendements du sol', to: '/c/amendements-sol' },
    ],
  },
]

const within = (path: string, link: NavLink) => path === link.to || path.startsWith(`${link.to}/`)

// Univers de la page : l'univers lui-même ou l'une de ses sous-catégories ; le premier sur l'accueil
export function activeSection(path: string) {
  return sectionTabs.find(tab => within(path, tab) || tab.children?.some(child => within(path, child)))
    ?? (path === '/' ? sectionTabs[0] : undefined)
}
