// Bilans et thérapies proposés à la boutique (page /bilans-therapies, sous-menu de l'en-tête)
export interface Service {
  id: string
  label: string
  title: string
  icon: string
  text: string
}

export const services: Service[] = [
  {
    id: 'quantum',
    label: 'Quantum',
    title: 'Bilan Quantum',
    icon: 'i-lucide-activity',
    text: 'Un outil d\'évaluation complémentaire utilisé dans notre démarche de santé et bien-être.',
  },
  {
    id: 'bioplasme',
    label: 'Bioplasme',
    title: 'Bilan Bioplasme',
    icon: 'i-lucide-scan-line',
    text: 'Une autre méthode d\'évaluation complémentaire permettant de recueillir différentes informations sur l\'organisme.',
  },
  {
    id: 'therahertz',
    label: 'Thérapie Térahertz',
    title: 'Thérapie Térahertz',
    icon: 'i-lucide-waves',
    text: 'Une prestation proposée dans le cadre du bien-être et du confort corporel, qui aide à réactiver la circulation sanguine.',
  },
  {
    id: 'detoxification',
    label: 'Détoxification',
    title: 'Détoxification ionique',
    icon: 'i-lucide-droplets',
    text: 'Une séance complémentaire de bien-être et de détente qui aide à éliminer les toxines du corps.',
  },
]
