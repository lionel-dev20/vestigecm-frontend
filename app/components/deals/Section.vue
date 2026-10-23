<script setup lang="ts">
const { data, status, execute } = useDeals()
</script>

<template>
  <ProductCarouselSection
    title="Bons plans"
    to="/c/all-offers"
    :products="data"
    :loading="status !== 'success'"
    :autoplay="4000"
    @visible="execute()"
  />
</template>
