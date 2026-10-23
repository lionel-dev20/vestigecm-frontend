<script setup lang="ts">
import type { Product } from '#shared/types/product'

defineProps<Product>()
</script>

<template>
  <NuxtLink :to="to" class="group block outline-none focus-visible:ring-2 focus-visible:ring-ink">
    <div class="aspect-square overflow-hidden rounded-xl bg-[#f3f3f3] p-4">
      <!-- mix-blend : fond blanc des photos fondu dans le gris -->
      <NuxtImg
        :src="image"
        :alt="name"
        width="240"
        height="240"
        densities="x1 x2"
        format="webp"
        loading="lazy"
        decoding="async"
        class="size-full object-contain mix-blend-multiply"
      />
    </div>

    <div class="px-1 pt-3">
      <!-- Mobile : 2 lignes · Tablette et plus : 3 lignes -->
      <h3 class="line-clamp-2 min-h-12 leading-6 sm:line-clamp-3 sm:min-h-18 text-[#333] group-hover:underline">{{ name }}</h3>
      <ProductRating :value="rating" :count="reviews" class="mt-1.5" />
      <p class="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span class="text-lg font-bold text-sale">{{ formatPrice(price) }}</span>
        <span v-if="oldPrice" class="text-sm text-[#666] line-through">{{ formatPrice(oldPrice) }}</span>
      </p>
    </div>
  </NuxtLink>
</template>
