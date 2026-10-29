<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Chargement des produits…' })
</script>

<template>
  <div role="status" class="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-6 py-5 text-[#555] shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
    <UIcon name="i-lucide-loader-circle" class="size-9 animate-spin text-ink" />
    <span class="text-sm font-medium">{{ label }}</span>
  </div>
</template>
