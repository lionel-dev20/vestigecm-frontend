<script setup lang="ts">
import type { Product } from '#shared/types/product'

const props = withDefaults(defineProps<{
  title: string
  // Lien « Tout voir »
  to: string
  products: Product[]
  loading?: boolean
  // Défilement automatique en ms (0 = désactivé)
  autoplay?: number
}>(), { autoplay: 0 })

// Prévient le parent à l'approche du scroll, pour qu'il charge les produits
const emit = defineEmits<{ visible: [] }>()
const section = useTemplateRef<HTMLElement>('section')
const inView = useInView(section)
watch(inView, () => emit('visible'), { once: true })

// 6 skeletons = le maximum visible sur grand écran
const placeholders = Array.from({ length: 6 })
const id = useId()
</script>

<template>
  <!-- Section pleine largeur : le fond se passe via class depuis le parent -->
  <!-- Masquée si la source ne renvoie aucun produit (ex. catégorie vide dans WooCommerce) -->
  <section v-if="loading || props.products.length" ref="section" :aria-labelledby="id">
    <div class="mx-auto max-w-350 px-4 py-10 lg:px-8">
      <div class="mb-6 flex items-baseline gap-5">
        <h2 :id="id" class="text-2xl font-bold text-[#333]">{{ title }}</h2>
        <NuxtLink :to="to" class="text-lg text-link underline">Tout voir</NuxtLink>
      </div>

      <BaseCarousel v-if="loading" :items="placeholders" :label="`Chargement : ${title}`">
        <template #item>
          <ProductCardSkeleton />
        </template>
      </BaseCarousel>

      <BaseCarousel v-else :items="props.products" :item-key="(product) => product.id" :autoplay="autoplay" :label="title">
        <template #item="{ item }">
          <ProductCard v-bind="item" />
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>
