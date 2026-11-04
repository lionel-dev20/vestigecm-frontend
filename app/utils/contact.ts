// Coordonnées de la boutique, utilisées dans le pied de page et la section « À propos »
export const contact = {
  whatsapp: '699 288 607',
  whatsappUrl: 'https://wa.me/237699288607',
  facebookUrl: 'https://www.facebook.com/people/Vestige-la-m%C3%A9decine-indienne-au-Cameroun-les-produits-qui-rassurent/61583334704745/',
  place: 'Logbaba 2 poteaux, sur la route de Ndogpassi 2',
  // Position Google Maps de la boutique (Douala)
  mapUrl: 'https://www.google.com/maps?q=4.030899,9.766589',
}

// Conversation WhatsApp de la boutique, avec un message pré-rempli facultatif
export const whatsappLink = (message?: string) =>
  message ? `${contact.whatsappUrl}?text=${encodeURIComponent(message)}` : contact.whatsappUrl
