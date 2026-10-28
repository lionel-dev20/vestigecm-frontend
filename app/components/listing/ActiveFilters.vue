<script setup lang="ts">
const { filters, update, clear } = useListingFilters()

// Une puce par filtre actif, chacune retire son filtre
const chips = computed(() => {
  const list: { label: string; remove: Record<string, undefined> }[] = []
  if (filters.value.promo) list.push({ label: 'En promotion', remove: { promo: undefined } })
  if (filters.value.rating) list.push({ label: `${filters.value.rating} étoiles et plus`, remove: { note: undefined } })
  if (filters.value.min || filters.value.max) {
    const from = filters.value.min ? formatPrice(filters.value.min) : '0'
    const to = filters.value.max ? formatPrice(filters.value.max) : '…'
    list.push({ label: `${from} – ${to}`, remove: { min: undefined, max: undefined } })
  }
  return list
})
</script>

<template>
  <div v-if="chips.length" class="flex flex-wrap items-center gap-2">
    <button
      v-for="chip in chips"
      :key="chip.label"
      type="button"
      class="flex cursor-pointer items-center gap-1.5 rounded-full bg-panel px-3 py-1.5 text-sm text-[#222] hover:bg-ink/10"
      :aria-label="`Retirer le filtre ${chip.label}`"
      @click="update(chip.remove)"
    >
      {{ chip.label }}
      <UIcon name="i-lucide-x" class="size-4" />
    </button>
    <button type="button" class="cursor-pointer px-2 text-sm font-semibold text-link hover:underline" @click="clear">
      Tout effacer
    </button>
  </div>
</template>
