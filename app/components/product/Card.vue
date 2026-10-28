<script setup lang="ts">
import type { Product } from '#shared/types/product'

const props = defineProps<Product>()

// Préchargement au survol / toucher / focus : la fiche est souvent prête avant le clic
const preview = useProductPreview()
const nuxtApp = useNuxtApp()
const warm = () => prefetchProduct(props.to, nuxtApp)
// Au clic, la fiche s'ouvre immédiatement avec les infos de la carte
const open = () => { preview.value = { ...props } }
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block outline-none focus-visible:ring-2 focus-visible:ring-ink"
    @pointerenter="warm"
    @focus="warm"
    @click="open"
  >
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
      <!-- Pas d'avis réels : pas d'étoiles (espace réservé pour aligner les prix) -->
      <ProductRating v-if="reviews" :value="rating" :count="reviews" class="mt-1.5" />
      <div v-else class="mt-1.5 h-[18px]" aria-hidden="true" />
      <ProductPrice :price="price" :old-price="oldPrice" class="mt-1" />
    </div>
  </NuxtLink>
</template>
