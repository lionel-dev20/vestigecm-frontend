<script setup lang="ts">
// Titre et lien « Tout voir » gérés dans WordPress (ACF) ; produits depuis WooCommerce
defineProps<{ title: string; to: string }>()
const { data, status, execute } = useHealthPicks()
</script>

<template>
  <!-- Comme les bons plans, sans défilement automatique -->
  <ProductCarouselSection
    :title="title"
    :to="to"
    :products="data"
    :loading="status === 'idle' || status === 'pending'"
    @visible="execute()"
  />
</template>
