<script setup lang="ts">
const props = defineProps<{ value: number; count: number }>()

// Étoiles pleines superposées aux grises, coupées au prorata de la note
const fill = computed(() => `${(props.value / 5) * 100}%`)
</script>

<template>
  <div class="flex items-center gap-1.5">
    <span class="relative text-lg leading-none tracking-wider" role="img" :aria-label="count ? `${value} sur 5, ${count} avis` : 'Aucun avis'">
      <span class="text-ink/15">★★★★★</span>
      <span class="absolute inset-0 overflow-hidden whitespace-nowrap text-star" :style="{ width: fill }">★★★★★</span>
    </span>
    <!-- Sans avis : étoiles grises seules -->
    <span v-if="count" class="text-sm text-link">{{ formatCount(count) }}</span>
  </div>
</template>
