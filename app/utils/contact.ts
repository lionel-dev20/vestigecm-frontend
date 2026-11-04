// Coordonnées de la boutique : seule source du numéro WhatsApp pour tout le site
// (les anciens champs WhatsApp d'ACF et NUXT_PUBLIC_WHATSAPP_URL ne sont plus utilisés)
export const contact = {
  whatsapp: '699 288 607',
  whatsappUrl: 'https://wa.me/237699288607',
  // Message pré-rempli des boutons « parler à un conseiller » (bannière de l'accueil, pied de page)
  whatsappMessage: 'Puis-je discuter avec un assistant s\'il vous plaît ?',
  facebookUrl: 'https://www.facebook.com/people/Vestige-la-m%C3%A9decine-indienne-au-Cameroun-les-produits-qui-rassurent/61583334704745/',
  place: 'Logbaba 2 poteaux, sur la route de Ndogpassi 2',
  // Position Google Maps de la boutique (Douala)
  mapUrl: 'https://www.google.com/maps?q=4.030899,9.766589',
}

// Conversation WhatsApp de la boutique, avec un message pré-rempli facultatif
export const whatsappLink = (message?: string) =>
  message ? `${contact.whatsappUrl}?text=${encodeURIComponent(message)}` : contact.whatsappUrl
