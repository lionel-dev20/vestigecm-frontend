<script setup lang="ts">
import type { ListingResult } from '#shared/utils/listing'

defineProps<Pick<ListingResult, 'priceRange' | 'promoCount' | 'categories'>>()

const route = useRoute()
const { filters, update } = useListingFilters()

// Prix : saisie locale, appliquée au clic sur OK
const min = ref('')
const max = ref('')
watch(filters, (value) => {
  min.value = value.min ? String(value.min) : ''
  max.value = value.max ? String(value.max) : ''
}, { immediate: true })

const pill = 'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors duration-150 cursor-pointer'
</script>

<template>
  <div class="space-y-6 text-[#222]">
    <section>
      <h2 class="text-lg font-bold">Filtres populaires</h2>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          :aria-pressed="filters.promo"
          :class="[pill, filters.promo ? 'border-ink bg-ink text-white' : 'border-ink/30 hover:border-ink']"
          @click="update({ promo: filters.promo ? undefined : '1' })"
        >
          En promotion
          <span v-if="promoCount !== null" class="opacity-70">({{ promoCount }})</span>
        </button>
        <button
          type="button"
          :aria-pressed="filters.rating === 4"
          :class="[pill, filters.rating === 4 ? 'border-ink bg-ink text-white' : 'border-ink/30 hover:border-ink']"
          @click="update({ note: filters.rating === 4 ? undefined : '4' })"
        >
          <span class="tracking-wider" :class="filters.rating === 4 ? 'text-white' : 'text-star'" aria-hidden="true">★★★★<span class="opacity-40">★</span></span>
          &amp; plus
          <span class="sr-only">4 étoiles et plus</span>
        </button>
      </div>
    </section>

    <section class="border-t border-ink/10 pt-6">
      <h2 class="text-lg font-bold">Prix (FCFA)</h2>
      <form class="mt-3 flex items-center gap-2" @submit.prevent="update({ min: min || undefined, max: max || undefined })">
        <input
          v-model="min"
          type="number"
          inputmode="numeric"
          min="0"
          aria-label="Prix minimum"
          :placeholder="priceRange ? String(priceRange.min) : 'Min'"
          class="h-11 w-full min-w-0 rounded-lg border border-ink/20 px-3 text-base outline-none focus-visible:border-ink"
        >
        <span class="text-[#999]">–</span>
        <input
          v-model="max"
          type="number"
          inputmode="numeric"
          min="0"
          aria-label="Prix maximum"
          :placeholder="priceRange ? String(priceRange.max) : 'Max'"
          class="h-11 w-full min-w-0 rounded-lg border border-ink/20 px-3 text-base outline-none focus-visible:border-ink"
        >
        <button type="submit" class="h-11 shrink-0 cursor-pointer rounded-lg border border-ink/20 px-3 text-sm font-semibold hover:bg-panel">OK</button>
      </form>
    </section>

    <section v-if="categories.length" class="border-t border-ink/10 pt-6">
      <h2 class="text-lg font-bold">Catégories</h2>
      <ul class="mt-3 space-y-1">
        <li v-for="category in categories" :key="category.to">
          <NuxtLink
            :to="category.to"
            class="block rounded-lg px-2 py-1.5 hover:bg-panel"
            :class="route.path === category.to ? 'font-semibold text-ink' : 'text-[#444]'"
          >
            {{ category.label }}
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
