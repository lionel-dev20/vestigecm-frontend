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
  },

  // Production uniquement : API du catalogue en cache 10 min (serveur + navigateur)
  $production: {
    routeRules: {
      '/api/**': { cache: { maxAge: 600 } },
    },
  },

  runtimeConfig: {
    public: {
      // Lien d'invitation du groupe (NUXT_PUBLIC_WHATSAPP_URL)
      whatsappUrl: 'https://chat.whatsapp.com/JcY2hwiD0db75RmNldsmR0',
    },
  },

  app: {
    head: { htmlAttrs: { lang: 'fr' } },
  },
})
