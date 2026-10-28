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
