<script setup lang="ts">
const props = defineProps<{ page: number; total: number; count: number }>()
const emit = defineEmits<{ filter: [] }>()
const { filters, update } = useListingFilters()

// « 25 - 48 sur 56 résultats »
const range = computed(() => {
  if (!props.total) return '0 résultat'
  const from = (props.page - 1) * listingPerPage + 1
  return `${from} - ${from + props.count - 1} sur ${props.total} résultat${props.total > 1 ? 's' : ''}`
})
const activeCount = computed(() => countActiveFilters(filters.value))
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <p class="text-lg text-[#333]" aria-live="polite">{{ range }}</p>

    <div class="flex items-center gap-2">
      <!-- Mobile : les filtres s'ouvrent dans un panneau -->
      <button
        type="button"
        class="flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-ink/30 px-4 font-semibold text-[#222] lg:hidden"
        @click="emit('filter')"
      >
        <UIcon name="i-lucide-sliders-horizontal" class="size-5" />
        Filtrer
        <span v-if="activeCount" class="flex size-5 items-center justify-center rounded-full bg-ink text-xs text-white">{{ activeCount }}</span>
      </button>

      <label class="flex h-12 items-center gap-1 rounded-lg border border-ink/30 pl-4 pr-2 focus-within:border-ink">
        <span class="text-[#555]">Trier par</span>
        <select
          :value="filters.sort"
          class="h-full cursor-pointer bg-transparent pr-1 font-semibold text-[#222] outline-none"
          @change="update({ tri: ($event.target as HTMLSelectElement).value === 'relevance' ? undefined : ($event.target as HTMLSelectElement).value })"
        >
          <option v-for="(label, key) in listingSorts" :key="key" :value="key">{{ label }}</option>
        </select>
      </label>
    </div>
  </div>
</template>
