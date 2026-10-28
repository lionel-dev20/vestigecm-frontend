<script setup lang="ts">
const quantity = defineModel<number>({ default: 1 })
const max = 20
</script>

<template>
  <div class="inline-flex h-12 items-center rounded-full border border-ink/20" role="group" aria-label="Quantité">
    <button
      type="button"
      aria-label="Diminuer"
      class="flex size-12 items-center justify-center rounded-full disabled:opacity-30"
      :disabled="quantity <= 1"
      @click="quantity--"
    >
      <UIcon name="i-lucide-minus" class="size-4" />
    </button>
    <span class="w-8 text-center font-semibold tabular-nums" aria-live="polite">{{ quantity }}</span>
    <button
      type="button"
      aria-label="Augmenter"
      class="flex size-12 items-center justify-center rounded-full disabled:opacity-30"
      :disabled="quantity >= max"
      @click="quantity++"
    >
      <UIcon name="i-lucide-plus" class="size-4" />
    </button>
  </div>
</template>
