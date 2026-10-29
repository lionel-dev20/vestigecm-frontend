<script setup lang="ts">
const route = useRoute()
const q = computed(() => String(route.query.q ?? '').trim())

// Même gabarit que les catégories : filtres, tri et pagination
const { data: result, status, error, refresh } = await useListing({ q })

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
  <div v-else class="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
    <BaseLoadError v-if="error" message="Impossible d'effectuer la recherche pour le moment." @retry="refresh()" />
    <BaseSpinner v-else label="Recherche en cours…" />
  </div>
</template>
