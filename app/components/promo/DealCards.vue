<script setup lang="ts">
// Contenu marketing statique : rendu serveur, aucune requête
const deals = [
  {
    badge: '-25 % sur les cheveux',
    title: 'Offres spéciales soins des cheveux',
    highlight: 'soins des cheveux',
    text: 'Des actifs naturels pour fortifier et faire briller vos cheveux.',
    cta: 'Acheter',
    to: '/c/cheveux',
    image: '/images/promos/cheveux.jpg',
    tone: 'light' as const,
  },
  {
    badge: '-20 % sur la peau',
    title: 'Économisez sur les soins de la peau',
    highlight: 'soins de la peau',
    text: 'Hydratation, éclat et protection au quotidien.',
    cta: 'Acheter',
    to: '/c/soins-peau',
    image: '/images/promos/peau.jpg',
    tone: 'dark' as const,
  },
]
</script>

<template>
  <!-- Mobile : empilées · Tablette et plus : côte à côte -->
  <section aria-label="Promotions" class="mx-auto grid max-w-350 gap-4 px-4 py-6 md:grid-cols-2 lg:gap-6 lg:px-8">
    <PromoDealCard v-for="deal in deals" :key="deal.to" v-bind="deal" />
  </section>
</template>
