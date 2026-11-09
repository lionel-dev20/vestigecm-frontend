// Page Témoignages, gérée dans WordPress avec ACF

// Témoignage vidéo : une fiche « Témoignage » dans WordPress
export interface Testimonial {
  id: string
  topic: string
  video: string
  // Image de couverture ('' : aucune) et durée affichée (« 2:17 », '' : inconnue)
  poster: string
  duration: string
  to: string
  linkLabel: string
}

export interface WhatsAppCta {
  title: string
  text: string
  label: string
  // Message pré-rempli dans la conversation WhatsApp de la boutique
  message: string
}

export interface TestimonialsPage {
  banner: string
  intro: string
  cta: WhatsAppCta
  items: Testimonial[]
}
