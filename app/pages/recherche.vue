<script setup lang="ts">
const route = useRoute()
const q = computed(() => String(route.query.q ?? '').trim())

// Même gabarit que les catégories : filtres, tri et pagination
const { data: result, status } = await useListing({ q })

// Pages de résultats : non indexées (contenu dupliqué des fiches)
useSeoMeta({
  title: () => (q.value ? `Recherche : ${q.value}` : 'Recherche'),
  robots: 'noindex, follow',
})
</script>

<template>
  <ListingView
    v-if="result"
    :result="result"
    :pending="status === 'pending'"
    :breadcrumb="[{ label: 'Accueil', to: '/' }, { label: 'Recherche' }]"
  />
</template>
