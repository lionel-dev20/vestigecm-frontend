<script setup lang="ts">
const route = useRoute()
const category = computed(() => [route.params.slug].flat().join('/'))

const { data: result, status } = await useListing({ category })
if (!result.value) throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable', fatal: true })

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
</template>
