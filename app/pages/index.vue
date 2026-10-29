<script setup lang="ts">
// Tout le contenu de l'accueil vient de WordPress (ACF, page « Accueil ») ;
// les produits et catégories viennent de WooCommerce, chargés au scroll
const { data: home } = await useHome()

useSeoMeta({
  title: 'Accueil',
  description: 'Compléments, santé et bien-être : les offres du moment.',
})

// Image principale = LCP : chargée en priorité, même URL optimisée que la carte
const img = useImage()
useHead(() => {
  const featured = home.value?.hero[0]
  if (!featured) return {}
  const href = img(featured.image, { width: heroImageWidth(true), format: 'webp' })
  return { link: [{ rel: 'preload', as: 'image', href, fetchpriority: 'high' }] }
})
</script>

<template>
  <template v-if="home">
    <!-- Au-dessus de la ligne de flottaison : rendu serveur -->
    <HeroPromoGrid :promos="home.hero" />

    <ContactWhatsAppBanner :title="home.whatsapp.title" :label="home.whatsapp.label" :to="home.whatsapp.to" />

    <QualityShowcase v-bind="home.quality" />

    <DealsSection v-bind="home.deals" />

    <HealthSection v-bind="home.health" />

    <PromoBanner v-bind="home.banner" />

    <HealthPicks v-bind="home.healthPicks" />

    <CategorySection v-bind="home.categories" />

    <AgriPicks v-bind="home.agriPicks" />

    <PromoDealCards :cards="home.dealCards" />

    <PromoCta v-bind="home.cta" />

    <AboutSection v-bind="home.about" />
  </template>
</template>
