<script setup lang="ts">
const { data, status, execute } = useAgriProducts()
</script>

<template>
  <!-- Même section que les bons plans, sans défilement automatique -->
  <ProductCarouselSection
    title="Agriculture"
    to="/c/agriculture"
    :products="data"
    :loading="status !== 'success'"
    @visible="execute()"
  />
</template>
