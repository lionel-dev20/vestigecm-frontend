<script setup lang="ts">
const props = defineProps<{
  price: number
  oldPrice?: number
  size?: 'md' | 'lg'
}>()

// Remise affichée seulement si un prix barré existe
const discount = computed(() =>
  props.oldPrice ? Math.round((1 - props.price / props.oldPrice) * 100) : 0,
)
</script>

<template>
  <p class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <span class="font-bold text-sale" :class="size === 'lg' ? 'text-3xl' : 'text-lg'">{{ formatPrice(price) }}</span>
    <span v-if="oldPrice" class="text-[#666] line-through" :class="size === 'lg' ? 'text-lg' : 'text-sm'">{{ formatPrice(oldPrice) }}</span>
    <span v-if="discount && size === 'lg'" class="rounded-md bg-sale/10 px-2 py-0.5 text-sm font-bold text-sale">-{{ discount }} %</span>
  </p>
</template>
