export interface FooterColumn {
  title: string
  links: NavLink[]
}

// Colonnes de liens : suivent la structure du site
export const footerColumns: FooterColumn[] = [
  {
    title: 'Aide & informations',
    links: [
      { label: 'Nous contacter', to: '/contact' },
      { label: 'Livraison', to: '/livraison' },
      { label: 'Suivre ma commande', to: '/suivi-commande' },
      { label: 'Retours et remboursements', to: '/retours' },
      { label: 'Moyens de paiement', to: '/paiement' },
      { label: 'Questions fréquentes', to: '/faq' },
    ],
  },
  {
    title: 'Boutique',
    links: [
      { label: 'Santé et beauté', to: '/c/sante' },
      { label: 'Kits traitement', to: '/c/kits-traitement' },
      { label: 'Agriculture', to: '/c/agriculture' },
      { label: 'Compléments', to: '/c/complements' },
      { label: 'Soins de la peau', to: '/c/soins-peau' },
      { label: 'Bons plans', to: '/c/all-offers' },
    ],
  },
  {
    title: 'Kits traitement',
    links: [
      { label: 'Diabète', to: '/p/kit-diabete-type-1-et-2' },
      { label: 'Tension artérielle', to: '/p/kit-tension-arterielle' },
      { label: 'Paralysie et AVC', to: '/p/kit-paralysie-et-avc' },
      { label: 'Arthrite', to: '/p/kit-arthrite' },
      { label: 'Prostatite', to: '/p/kit-prostatite' },
      { label: 'Ménopause', to: '/p/kit-menopause-et-perimenopause' },
    ],
  },
  {
    title: 'VESTIGE',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Notre promesse qualité', to: '/qualite' },
      { label: 'Ayurvéda', to: '/c/ayurveda' },
      { label: 'Témoignages', to: '/temoignages' },
      { label: 'Carrière', to: '/carriere' },
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Politique de confidentialité', to: '/confidentialite' },
      { label: 'Conditions générales de vente', to: '/cgv' },
    ],
  },
]

// Réseaux sociaux : remplacer les URL par les pages officielles
export const socialLinks: NavLink[] = [
  { label: 'Instagram', to: 'https://www.instagram.com/', icon: 'i-simple-icons-instagram' },
  { label: 'Facebook', to: contact.facebookUrl, icon: 'i-simple-icons-facebook' },
  { label: 'TikTok', to: 'https://www.tiktok.com/', icon: 'i-simple-icons-tiktok' },
  { label: 'YouTube', to: 'https://www.youtube.com/', icon: 'i-simple-icons-youtube' },
]
