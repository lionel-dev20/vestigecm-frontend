<script setup lang="ts">
import type { HomeDealCard } from '#shared/types/home'

// Contenu géré dans WordPress (ACF, onglet « 10. Cartes promo »)
defineProps<{ cards: HomeDealCard[] }>()
</script>

<template>
  <!-- Mobile : empilées · Tablette et plus : côte à côte -->
  <section aria-label="Promotions" class="mx-auto grid max-w-350 gap-4 px-4 py-6 md:grid-cols-2 lg:gap-6 lg:px-8">
    <PromoDealCard v-for="(card, index) in cards" :key="index" v-bind="card" />
  </section>
</template>
