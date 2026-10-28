<script setup lang="ts">
import type { ProductDetail } from '#shared/types/product'

// loading : fiche complète pas encore reçue (résumé et stock en attente)
defineProps<{ product: ProductDetail; loading?: boolean }>()
const quantity = defineModel<number>('quantity', { default: 1 })
const emit = defineEmits<{ buy: [] }>()
</script>

<template>
  <div class="space-y-5">
    <div>
      <p class="font-semibold uppercase tracking-wide text-leaf">{{ product.brand }}</p>
      <h1 class="mt-1 text-2xl font-bold leading-tight text-[#222] lg:text-3xl">{{ product.name }}</h1>
      <!-- Prix unique, juste sous le nom -->
      <ProductPrice :price="product.price" :old-price="product.oldPrice" size="lg" class="mt-3" />
      <ProductRating v-if="product.reviews" :value="product.rating" :count="product.reviews" class="mt-2" />
    </div>

    <div v-if="loading" class="space-y-2" aria-hidden="true">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-4/5" />
      <USkeleton class="mt-4 h-4 w-1/2" />
    </div>
    <p v-else class="leading-relaxed text-[#444]">{{ product.summary }}</p>

    <p v-if="!loading" class="flex items-center gap-2 text-sm font-medium" :class="product.inStock ? 'text-leaf' : 'text-sale'">
      <span class="size-2 rounded-full" :class="product.inStock ? 'bg-leaf' : 'bg-sale'" />
      {{ product.inStock ? 'En stock, prêt à être expédié' : 'Momentanément indisponible' }}
    </p>

    <!-- Bureau uniquement : sur mobile, la barre collée en bas prend le relais -->
    <ProductPurchase v-model:quantity="quantity" :in-stock="product.inStock" :disabled="loading" class="max-lg:hidden" @buy="emit('buy')" />

    <ProductReassurance />
  </div>
</template>
