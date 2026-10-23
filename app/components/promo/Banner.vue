<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  cta: string
  to: string
  image: string
  // Couleur affichée tant que l'image n'est pas chargée
  bg?: string
}>(), { bg: '#7a6658' })

const background = useCardBackground(() => props, 2800)
</script>

<template>
  <section class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <!-- Toute la bannière est un seul lien ; le bouton n'est qu'un style · hauteur max 100px -->
    <NuxtLink
      :to="to"
      :style="background"
      class="group flex h-20 items-center justify-between gap-4 overflow-hidden rounded-xl bg-cover bg-center px-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-ink sm:h-25 sm:px-8"
    >
      <div class="min-w-0">
        <h2 class="truncate text-2xl font-black uppercase leading-none tracking-tight sm:text-4xl lg:text-6xl">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-1 truncate text-xs sm:text-base lg:text-lg">{{ subtitle }}</p>
      </div>

      <span
        class="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-extrabold uppercase text-[#111] transition-colors duration-150 group-hover:bg-white/90 sm:px-8 sm:py-3 sm:text-lg"
      >
        {{ cta }}
      </span>
    </NuxtLink>
  </section>
</template>
