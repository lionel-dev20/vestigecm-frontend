<script setup lang="ts">
import type { ListingResult } from '#shared/utils/listing'

const props = defineProps<{
  result: ListingResult
  pending: boolean
  breadcrumb: { label: string; to?: string }[]
}>()

const filtersOpen = ref(false)
const grid = useTemplateRef<HTMLElement>('grid')
const route = useRoute()

// Changement de page : on remonte en haut de la grille
watch(() => route.query.page, () => {
  if (grid.value && grid.value.getBoundingClientRect().top < 0) grid.value.scrollIntoView({ block: 'start' })
})

// Le panneau mobile se ferme après chaque filtre appliqué
watch(() => route.fullPath, () => (filtersOpen.value = false))

const { clear } = useListingFilters()
const hasFilters = computed(() => countActiveFilters(parseListingFilters(route.query)) > 0)
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="breadcrumb" />
    <h1 class="mt-4 text-2xl font-bold text-[#222] lg:text-3xl">{{ result.title }}</h1>
    <p v-if="result.description" class="mt-2 max-w-3xl text-[#555]">{{ result.description }}</p>

    <!-- Bureau : filtres à gauche · Mobile : panneau « Filtrer » -->
    <div class="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[16rem_1fr] lg:gap-12">
      <!-- Collés au scroll jusqu'à la fin des produits ; défilent eux-mêmes s'ils dépassent l'écran -->
      <aside
        class="scrollbar-none hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto"
        aria-label="Filtres"
      >
        <ListingFilters :price-range="result.priceRange" :promo-count="result.promoCount" :categories="result.categories" />
      </aside>

      <section ref="grid" class="min-w-0 scroll-mt-28" aria-label="Produits">
        <ListingToolbar :page="result.page" :total="result.total" :count="result.products.length" @filter="filtersOpen = true" />
        <ListingActiveFilters class="mt-4" />

        <!-- Pendant un changement de filtre, de tri ou de page : résultats précédents atténués + spinner -->
        <div class="relative mt-6" :aria-busy="pending">
          <ul
            v-if="result.products.length"
            class="grid grid-cols-2 gap-x-4 gap-y-8 transition-opacity duration-150 sm:grid-cols-3 xl:grid-cols-4"
            :class="pending && 'opacity-40'"
          >
            <li v-for="product in result.products" :key="product.id">
              <ProductCard v-bind="product" />
            </li>
          </ul>

          <!-- Spinner collé au milieu de l'écran, même sur une longue grille -->
          <div v-if="pending" class="absolute inset-0 z-10 flex justify-center">
            <BaseSpinner class="sticky top-[45vh] h-fit" />
          </div>
        </div>

        <div v-if="!result.products.length && !pending" class="mt-2 rounded-2xl bg-panel p-8 text-center">
          <UIcon name="i-lucide-search-x" class="size-12 text-[#bbb]" />
          <p class="mt-3 text-lg font-semibold text-[#222]">Aucun produit ne correspond</p>
          <p class="mt-1 text-[#666]">
            {{ hasFilters ? 'Essayez de retirer un filtre.' : 'Vérifiez l\'orthographe ou essayez un mot plus court.' }}
          </p>
          <button
            v-if="hasFilters"
            type="button"
            class="mt-5 cursor-pointer rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
            @click="clear"
          >
            Retirer les filtres
          </button>
        </div>

        <ListingPagination :page="result.page" :page-count="result.pageCount" class="mt-10" />
      </section>
    </div>

    <USlideover v-model:open="filtersOpen" side="left" title="Filtrer" class="lg:hidden">
      <template #body>
        <ListingFilters :price-range="result.priceRange" :promo-count="result.promoCount" :categories="result.categories" />
      </template>
    </USlideover>
  </div>
</template>
