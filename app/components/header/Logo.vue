<script setup lang="ts">
withDefaults(defineProps<{ name?: string }>(), { name: 'Vestige' })
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5 text-ink" :aria-label="`${name} — accueil`">
    <!-- Monogramme simple, à remplacer par le logo SVG final -->
    <svg viewBox="0 0 32 28" class="h-6 w-auto lg:h-7" aria-hidden="true">
      <path d="M0 0h8l8 12 8-12h8v28h-8V12l-8 12-8-12v16H0z" fill="currentColor" />
    </svg>
    <span class="text-lg font-extrabold uppercase tracking-[0.18em] lg:text-2xl">{{ name }}</span>
  </NuxtLink>
</template>
