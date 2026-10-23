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
      { label: 'Beauté et santé', to: '/' },
      { label: 'Kit des maladies', to: '/c/kit-maladies' },
      { label: 'Agriculture', to: '/c/agriculture' },
      { label: 'Compléments', to: '/c/complements' },
      { label: 'Soins de la peau', to: '/c/soins-peau' },
      { label: 'Bons plans', to: '/c/all-offers' },
    ],
  },
  {
    title: 'Kits santé',
    links: [
      { label: 'Diabète', to: '/c/kit-maladies/diabete' },
      { label: 'Hypertension & hypotension', to: '/c/kit-maladies/tension' },
      { label: 'AVC & mémoire', to: '/c/kit-maladies/avc-memoire' },
      { label: 'Arthrose & rhumatismes', to: '/c/kit-maladies/arthrose' },
      { label: 'Prostate & fertilité', to: '/c/kit-maladies/prostate-fertilite' },
      { label: 'Ménopause', to: '/c/kit-maladies/menopause-chroniques' },
    ],
  },
  {
    title: 'VESTIGE',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Notre promesse qualité', to: '/qualite' },
      { label: 'Ayurvéda', to: '/c/ayurveda' },
      { label: 'Devenir distributeur', to: '/distributeur' },
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Politique de confidentialité', to: '/confidentialite' },
      { label: 'Conditions générales de vente', to: '/cgv' },
    ],
  },
]

// Réseaux sociaux : remplacer les URL par les pages officielles
export const socialLinks: NavLink[] = [
  { label: 'Instagram', to: 'https://www.instagram.com/', icon: 'i-simple-icons-instagram' },
  { label: 'Facebook', to: 'https://www.facebook.com/', icon: 'i-simple-icons-facebook' },
  { label: 'TikTok', to: 'https://www.tiktok.com/', icon: 'i-simple-icons-tiktok' },
  { label: 'YouTube', to: 'https://www.youtube.com/', icon: 'i-simple-icons-youtube' },
]
