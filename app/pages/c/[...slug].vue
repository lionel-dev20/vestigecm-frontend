<script setup lang="ts">
const route = useRoute()
const category = computed(() => [route.params.slug].flat().join('/'))

const { data: result, status, error, refresh } = await useListing({ category })

// Catégorie inconnue : 404 au rendu serveur, ou dès la réponse en navigation
if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable', fatal: true })
watch(error, (value) => {
  if (value?.statusCode === 404) showError({ statusCode: 404, statusMessage: 'Catégorie introuvable' })
})

// Pages filtrées ou triées : non indexées (même contenu que la catégorie)
const filtered = computed(() => Object.keys(route.query).some(key => key !== 'page'))
useSeoMeta({
  title: () => result.value?.title,
  description: () => result.value?.description,
  robots: () => (filtered.value ? 'noindex, follow' : 'index, follow'),
})
</script>

<template>
  <ListingView
    v-if="result"
    :result="result"
    :pending="status === 'pending'"
    :breadcrumb="[{ label: 'Accueil', to: '/' }, { label: result.title }]"
  />
  <!-- Arrivée sur une autre catégorie : la page s'ouvre tout de suite, les produits suivent -->
  <div v-else class="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
    <BaseLoadError v-if="error" @retry="refresh()" />
    <BaseSpinner v-else />
  </div>
</template>
