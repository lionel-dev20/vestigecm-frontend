<script setup lang="ts">
defineProps<{ links: NavLink[] }>()

const route = useRoute()

// Actif sur l'univers, ses sous-catégories, et par défaut sur l'accueil
const isActive = (to: string) => activeSection(route.path)?.to === to
</script>

<template>
  <nav aria-label="Univers">
    <!-- 6 univers : plus serrés sous 1536px pour laisser la place à la recherche et au panier -->
    <ul class="flex items-center gap-0.5 2xl:gap-1">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="block whitespace-nowrap rounded-full border-2 px-2.5 py-4 text-[13px] font-bold uppercase leading-none transition-colors duration-150 2xl:px-3 2xl:text-sm"
          :class="isActive(link.to) ? 'border-accent' : 'border-transparent hover:border-ink/15'"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
