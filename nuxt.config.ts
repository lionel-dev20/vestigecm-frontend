// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Nuxt UI embarque Tailwind, @nuxt/icon et @nuxt/fonts
  modules: ['@nuxt/ui', '@nuxt/image'],
  css: ['~/assets/css/main.css'],

  // Images redimensionnées et converties à la volée (IPX)
  image: {
    quality: 80,
    // Seuls ces domaines peuvent être redimensionnés : photos produits hébergées par WooCommerce
    domains: ['admin.vestigecmr.com'],
    // Photos traitées gardées 30 jours par le navigateur (et le CDN), au lieu de 60 secondes
    ipx: { maxAge: 60 * 60 * 24 * 30 },
  },

  // Production uniquement : API du catalogue en cache 10 min (serveur + navigateur)
  $production: {
    routeRules: {
      '/api/**': { cache: { maxAge: 600 } },
      // Jamais de cache sur la commande : le cache Nitro perd le corps des POST
      '/api/checkout': { cache: false },
    },
  },

  // Valeurs vides par défaut, remplies par les variables NUXT_* (voir .env.example)
  runtimeConfig: {
    // Côté serveur uniquement : jamais envoyé au navigateur
    wordpress: {
      url: '',
      username: '',
      appPassword: '',
      menuId: '',
    },
    woocommerce: {
      url: '',
      consumerKey: '',
      consumerSecret: '',
    },

    public: {
      // Lien d'invitation du groupe (NUXT_PUBLIC_WHATSAPP_URL)
      whatsappUrl: 'https://chat.whatsapp.com/JcY2hwiD0db75RmNldsmR0',
    },
  },

  app: {
    head: { htmlAttrs: { lang: 'fr' } },
  },
})
