<script setup lang="ts">
const { data, status, execute } = useHealthPicks()
</script>

<template>
  <!-- Comme les bons plans, sans défilement automatique -->
  <ProductCarouselSection
    title="Essentiels santé"
    to="/c/sante"
    :products="data"
    :loading="status !== 'success'"
    @visible="execute()"
  />
</template>
