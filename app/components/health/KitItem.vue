<script setup lang="ts">
import type { HealthKit } from '#shared/types/health-kit'

defineProps<HealthKit>()
</script>

<template>
  <!-- Toute la vignette est un seul lien ; l'action n'est qu'un style -->
  <NuxtLink :to="to" class="group flex h-full flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-navy">
    <div class="aspect-square w-full overflow-hidden rounded-full bg-white p-5">
      <NuxtImg
        :src="image"
        :alt="name"
        width="160"
        height="160"
        densities="x1 x2"
        format="webp"
        loading="lazy"
        decoding="async"
        class="size-full object-contain"
      />
    </div>
    <p class="mb-2 mt-3 text-[12px] font-medium leading-snug text-[#222] lg:text-[13px]">{{ name }}</p>
    <!-- mt-auto : boutons alignés même si les noms font 1 à 3 lignes -->
    <span
      class="mt-auto rounded-full border border-navy px-3 py-1 text-sm font-semibold text-navy transition-colors duration-150 group-hover:bg-navy group-hover:text-white"
    >
      {{ cta }}
    </span>
  </NuxtLink>
</template>
