<script setup lang="ts">
defineProps<{ links: NavLink[] }>()

const route = useRoute()

// Actif sur l'univers, ses sous-catégories, et par défaut sur l'accueil
const isActive = (to: string) => activeSection(route.path)?.to === to
</script>

<template>
  <nav aria-label="Univers">
    <ul class="flex items-center gap-2">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="block rounded-full border-2 px-4 py-4 text-md font-bold uppercase leading-none transition-colors duration-150"
          :class="isActive(link.to) ? 'border-accent' : 'border-transparent hover:border-ink/15'"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
