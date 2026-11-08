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

// Bilans Quantum et Bioplasme : même présentation et mêmes systèmes analysés (section « Les différents bilans »)
export const bilanDetails = {
  intro: [
    'Un bilan de santé au Quantum ou au Bioplasme vous permet de faire un point complet sur votre état de santé général.',
    'Le bilan permet parfois de détecter un problème de santé, qui se soignera plus rapidement que si vous aviez attendu d\'en ressentir les premiers symptômes.',
    'Un bilan de santé complet à l\'aide de nos scanners biométriques à faibles ondes magnétiques nous permet de faire plus de 36 analyses des systèmes :',
  ],
  analyses: [
    'Cardio-vasculaire et cérébrovasculaire',
    'Fonction gastro-intestinale',
    'Fonction du foie',
    'Fonction de la vésicule biliaire',
    'Fonction pancréatique',
    'Fonction des reins',
    'Fonction des poumons',
    'Nerfs du cerveau',
    'Maladie osseuse',
    'Densité osseuse',
    'Maladie rhumatoïde des os',
    'Sucre dans le sang',
    'Qualité physique de base',
    'Toxicité du corps',
    'Oligo-éléments',
    'Prostate (homme)',
    'Fonction sexuelle masculine (homme)',
    'Gynécologie (femme)',
    'Peau',
    'Système endocrinien',
    'Système immunitaire',
    'Sein (femme)',
    'Vitamines',
    'Acides aminés',
    'Index de croissance osseuse',
    'Œil',
    'Métaux lourds',
    'Allergies',
    'Coenzymes',
    'Éléments du corps humain',
    'Obésité',
    'Collagène',
    'Impulsion du cœur et du cerveau',
    'Canaux et collatéraux',
    'Sperme (homme)',
    'Cycle menstruel (femme)',
    'Lipides sanguins',
  ],
}

// Détoxification ionique : présentation et photos (section « Nos thérapies » de la page)
// fit « contain » : schéma affiché en entier ; « cover » : photo recadrée (visages floutés), position : partie gardée
export const detoxDetails = {
  tagline: 'Offrez à votre corps un moment de détente et de bien-être.',
  text: 'La détoxification ionique est proposée comme une séance de bien-être basée sur l\'utilisation d\'un bain de pieds ionique, le but étant de vous aider à éliminer naturellement les déchets accumulés dans le corps.',
  benefits: [
    'Un moment de relaxation',
    'Une sensation de légèreté et de confort',
    'Une expérience de bien-être agréable',
    'La possibilité d\'intégrer une séance à une démarche globale d\'hygiène de vie',
  ],
  images: [
    { src: '/images/therapies/bain-de-pieds-ionique.jpg', alt: 'Séance de bain de pieds ionique', width: 810, height: 1080, fit: 'cover' },
    { src: '/images/therapies/seance-pieds.jpg', alt: 'Séance de bien-être des pieds au centre VESTIGE', width: 1080, height: 810, fit: 'cover', position: 'bottom' },
    { src: '/images/therapies/reflexologie-zones.jpg', alt: 'Schéma des zones réflexes du pied : yeux, cœur, reins, intestins…', width: 1080, height: 1160, fit: 'contain' },
    { src: '/images/therapies/reflexologie-points.jpg', alt: 'Schéma des 35 points de réflexologie plantaire', width: 805, height: 1080, fit: 'contain' },
  ],
}
