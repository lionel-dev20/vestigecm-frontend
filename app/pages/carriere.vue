<script setup lang="ts">
// Carrière = les kits d'adhésion (catégorie WooCommerce « kits-adhesion »), même gabarit que les catégories
const { data: result, status, error, refresh } = await useListing({ category: 'kits-adhesion' })

useSeoMeta({
  title: 'Carrière : kits d\'adhésion',
  description: 'Devenez distributeur VESTIGE Cameroun : choisissez votre kit d\'adhésion, de 25 000 à 145 000 FCFA.',
})
</script>

<template>
  <ListingView
    v-if="result"
    :result="{ ...result, title: 'Carrière : devenez distributeur VESTIGE', description: 'Choisissez votre kit d\'adhésion pour démarrer votre activité.' }"
    :pending="status === 'pending'"
    :breadcrumb="[{ label: 'Accueil', to: '/' }, { label: 'Carrière' }]"
  />
  <div v-else class="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4">
    <BaseLoadError v-if="error" @retry="refresh()" />
    <BaseSpinner v-else />
  </div>
</template>
