<script setup lang="ts">
// Titre et lien « Tout voir » gérés dans WordPress (ACF) ; produits depuis WooCommerce
defineProps<{ title: string; to: string }>()
const { data, status, execute } = useDeals()
</script>

<template>
  <ProductCarouselSection
    :title="title"
    :to="to"
    :products="data"
    :loading="status === 'idle' || status === 'pending'"
    :autoplay="4000"
    @visible="execute()"
  />
</template>
