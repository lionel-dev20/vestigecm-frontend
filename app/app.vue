<script setup lang="ts">
// Favicon géré dans WordPress (Réglages > Général > Icône du site)
const { data: branding } = await useBranding()

useHead(() => {
  const icons = branding.value?.favicon
  return icons
    ? {
        link: [
          { rel: 'icon', type: 'image/png', href: icons['32'] },
          { rel: 'icon', type: 'image/png', sizes: '192x192', href: icons['192'] },
          { rel: 'apple-touch-icon', sizes: '180x180', href: icons['180'] },
        ],
      }
    : {}
})
</script>

<template>
  <!-- Notifications en haut : la barre d'achat mobile occupe le bas de l'écran -->
  <UApp :toaster="{ position: 'top-center' }">
    <!-- Barre de progression en haut de l'écran : chaque clic est visiblement pris en compte -->
    <NuxtLoadingIndicator color="#e5452f" :height="3" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
