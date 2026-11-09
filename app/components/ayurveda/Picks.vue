<script setup lang="ts">
// Carrousel « Produits ayurvédiques » de l'accueil ; produits depuis la catégorie WooCommerce du même nom
const { data, status, execute } = useAyurvedaProducts()
</script>

<template>
  <ProductCarouselSection
    title="Produits ayurvédiques"
    to="/c/produits-ayurvediques"
    :products="data"
    :loading="status === 'idle' || status === 'pending'"
    @visible="execute()"
  />
</template>
