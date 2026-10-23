<script setup lang="ts">
import type { ShowcaseItem } from '#shared/types/showcase'

const props = defineProps<ShowcaseItem>()

const background = useCardBackground(() => props, 800)
</script>

<template>
  <!-- Toute la carte est un seul lien ; le « bouton » n'est qu'un style -->
  <NuxtLink
    :to="to"
    class="group block rounded-xl bg-white p-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ink"
  >
    <div
      :style="background"
      class="relative aspect-3/4 overflow-hidden rounded-lg bg-cover bg-center"
      :class="tone === 'light' ? 'text-white' : 'text-ink'"
    >
      <div class="absolute inset-x-0 bottom-0 p-5 text-center">
        <h3 class="text-2xl font-black uppercase leading-none lg:text-3xl">{{ title }}</h3>
        <p v-if="subtitle" class="mt-1.5 text-base lg:text-lg">{{ subtitle }}</p>
      </div>
    </div>

    <span
      class="mt-2.5 flex h-14 items-center justify-center rounded-full border-2 border-ink px-4 text-center font-bold uppercase text-ink transition-colors duration-150 group-hover:bg-ink group-hover:text-white lg:text-lg"
    >
      {{ cta }}
    </span>
  </NuxtLink>
</template>
