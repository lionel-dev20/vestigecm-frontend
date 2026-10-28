<script setup lang="ts">
// Le dernier élément est la page courante (non cliquable)
defineProps<{ links: { label: string; to?: string }[] }>()
</script>

<template>
  <nav aria-label="Fil d'Ariane">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm text-[#666]">
      <li v-for="(link, index) in links" :key="index" class="flex items-center gap-1.5">
        <UIcon v-if="index > 0" name="i-lucide-chevron-right" class="size-4 text-[#aaa]" />
        <NuxtLink v-if="link.to" :to="link.to" class="hover:text-ink hover:underline">{{ link.label }}</NuxtLink>
        <span v-else aria-current="page" class="line-clamp-1 text-[#333]">{{ link.label }}</span>
      </li>
    </ol>
  </nav>
</template>
