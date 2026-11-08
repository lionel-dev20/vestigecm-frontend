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
