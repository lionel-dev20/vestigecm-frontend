<script setup lang="ts">
const query = ref('')

function submit() {
  const q = query.value.trim()
  if (q) navigateTo({ path: '/search', query: { q } })
}
</script>

<template>
  <form role="search" class="relative" @submit.prevent="submit">
    <UIcon
      name="i-lucide-search"
      class="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-accent"
    />
    <input
      v-model="query"
      type="search"
      placeholder="Search"
      aria-label="Rechercher"
      class="h-12 w-full rounded-full bg-field pl-13 pr-5 text-base text-ink placeholder:text-ink/70 outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
    >
  </form>
</template>
