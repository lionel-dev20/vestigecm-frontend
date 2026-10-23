<script setup lang="ts">
import type { Promo } from '#shared/types/promo'

const props = defineProps<Promo & { featured?: boolean }>()

// Couleur de secours + image : la carte reste lisible si l'image manque
const background = useCardBackground(() => props, heroImageWidth(props.featured))
</script>

<template>
  <NuxtLink
    :to="to"
    :style="background"
    class="block overflow-hidden rounded-2xl bg-cover bg-center outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    :class="[tone === 'light' ? 'text-white' : 'text-ink', heroCardSize(featured)]"
  >
    <h2 class="font-extrabold" :class="featured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-xl lg:text-2xl'">
      {{ title }}
    </h2>
    <p
      class="mt-2 max-w-md"
      :class="featured ? 'text-lg sm:text-2xl lg:mt-4 lg:text-3xl' : 'max-w-64 text-base lg:text-lg'"
    >
      {{ subtitle }}
    </p>
  </NuxtLink>
</template>
