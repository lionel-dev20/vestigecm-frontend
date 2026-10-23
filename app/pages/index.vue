<script setup lang="ts">
const { data: promos, status } = usePromos()

useSeoMeta({
  title: 'Accueil',
  description: 'Compléments, santé et bien-être : les offres du moment.',
})

// Image principale = LCP : chargée en priorité, même URL optimisée que la carte
const img = useImage()
useHead(() => {
  const featured = promos.value[0]
  if (!featured) return {}
  const href = img(featured.image, { width: heroImageWidth(true), format: 'webp' })
  return { link: [{ rel: 'preload', as: 'image', href, fetchpriority: 'high' }] }
})
</script>

<template>
  <!-- Au-dessus de la ligne de flottaison : rendu serveur, pas de lazy au scroll -->
  <HeroPromoGrid :promos="promos" :loading="status === 'pending'" />

  <ContactWhatsAppBanner />

  <QualityShowcase />

  <DealsSection />

  <HealthSection />

  <PromoBanner
    title="Ayurvéda"
    subtitle="Notre nouvelle gamme de soins naturels"
    cta="Découvrir"
    to="/c/ayurveda"
    image="/images/banners/ayurveda.jpg"
  />

  <HealthPicks />

  <CategorySection />

  <AgriPicks />

  <PromoDealCards />

  <PromoCta
    eyebrow="Offres de la semaine"
    title="Économies exceptionnelles : vos essentiels bien-être de la semaine"
    highlight="vos essentiels bien-être de la semaine"
    text="Chaque semaine, une sélection de produits naturels à prix réduit."
    cta="Acheter"
    to="/c/all-offers"
    image="/images/promos/semaine.jpg"
  />

  <!--
    Sections suivantes : chargées au scroll.
    <BaseLazySection>
      <LazyHomeBestSellers />
      <template #fallback><HomeBestSellersSkeleton /></template>
    </BaseLazySection>
  -->
</template>
