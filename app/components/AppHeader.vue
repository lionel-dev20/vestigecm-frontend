<script setup lang="ts">
const menuOpen = ref(false)
const route = useRoute()

// Ferme le menu mobile après chaque navigation
watch(() => route.fullPath, () => (menuOpen.value = false))
</script>

<template>
  <!-- contents : la 1re ligne peut rester collée sur toute la hauteur de la page -->
  <header class="contents text-ink">
    <!-- Ligne principale collée au scroll, avec bordure gris clair + ombre douce -->
    <div class="sticky top-0 z-30 border-b border-[#ececec] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div class="mx-auto flex max-w-350 flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 lg:flex-nowrap lg:gap-x-10 lg:px-8 lg:py-4">
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          size="xl"
          aria-label="Ouvrir le menu"
          class="-ml-2 text-ink lg:hidden"
          @click="menuOpen = true"
        />

        <HeaderLogo />

        <HeaderSectionTabs :links="sectionTabs" class="hidden lg:block lg:ml-8" />

        <!-- Mobile : ligne pleine largeur sous le logo -->
        <HeaderSearch class="order-last w-full lg:order-0 lg:ml-auto lg:w-auto lg:max-w-md lg:flex-1" />

        <HeaderActions class="ml-auto lg:ml-0" />
      </div>
    </div>

    <!-- Défile avec la page -->
    <HeaderCategoryNav :links="categoryLinks" class="hidden bg-white md:block" />

    <HeaderMobileMenu v-model:open="menuOpen" :tabs="sectionTabs" :categories="categoryLinks" />
  </header>
</template>
