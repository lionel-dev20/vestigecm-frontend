<script setup lang="ts">
import type { Category } from '#shared/types/category'

defineProps<Category>()
</script>

<template>
  <NuxtLink :to="to" class="group block text-center outline-none focus-visible:ring-2 focus-visible:ring-forest">
    <div class="aspect-square overflow-hidden rounded-full bg-white">
      <NuxtImg
        :src="image"
        :alt="name"
        width="200"
        height="200"
        densities="x1 x2"
        format="webp"
        loading="lazy"
        decoding="async"
        class="size-full object-cover"
      />
    </div>
    <p class="mt-3 font-medium text-[#222] group-hover:underline lg:text-lg">{{ name }}</p>
    <p class="text-sm text-[#888]">{{ count }} produits</p>
  </NuxtLink>
</template>
