<script setup lang="ts">
// Logo géré dans WordPress (Apparence > Personnaliser > Identité du site) ; logo texte en secours
const { data: branding } = await useBranding()

const logo = computed(() => branding.value?.logo)
const name = computed(() => branding.value?.name || 'Vestige')

// Largeur affichée déduite des proportions réelles : pas de décalage au chargement
const height = 40
const width = computed(() => (logo.value ? Math.round((logo.value.width / logo.value.height) * height) : 0))
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5 text-ink" :aria-label="`${name} — accueil`">
    <NuxtImg
      v-if="logo"
      :src="logo.url"
      :alt="logo.alt"
      :width="width"
      :height="height"
      densities="x1 x2"
      format="webp"
      fetchpriority="high"
      class="h-7 w-auto lg:h-10"
    />

    <template v-else>
      <svg viewBox="0 0 32 28" class="h-6 w-auto lg:h-7" aria-hidden="true">
        <path d="M0 0h8l8 12 8-12h8v28h-8V12l-8 12-8-12v16H0z" fill="currentColor" />
      </svg>
      <span class="text-lg font-extrabold uppercase tracking-[0.18em] lg:text-2xl">{{ name }}</span>
    </template>
  </NuxtLink>
</template>
