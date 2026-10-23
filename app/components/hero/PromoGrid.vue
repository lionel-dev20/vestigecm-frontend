<script setup lang="ts">
import type { Promo } from '#shared/types/promo'

const props = defineProps<{ promos: Promo[]; loading?: boolean }>()

const featured = computed(() => props.promos[0])
const others = computed(() => props.promos.slice(1))
</script>

<template>
  <!-- Mobile : pile · Tablette : grande carte puis 2 côte à côte · Bureau : grande carte (2/3) + 2 empilées -->
  <section aria-label="Offres du moment" :aria-busy="loading" class="mx-auto max-w-350 px-4 py-4 lg:px-8">
    <div class="grid gap-4 sm:grid-cols-2 lg:h-120 lg:grid-cols-3 lg:grid-rows-2">
      <template v-if="loading">
        <HeroPromoCardSkeleton featured class="sm:col-span-2 lg:row-span-2" />
        <HeroPromoCardSkeleton v-for="n in 2" :key="n" class="max-sm:hidden" />
      </template>

      <template v-else>
        <HeroPromoCard v-if="featured" v-bind="featured" featured class="sm:col-span-2 lg:row-span-2" />
        <!-- Mobile : seule la grande carte est affichée -->
        <HeroPromoCard v-for="promo in others" :key="promo.to" v-bind="promo" class="max-sm:hidden" />
      </template>
    </div>
  </section>
</template>
