<script setup lang="ts">
defineProps<{ links: NavLink[] }>()

const route = useRoute()

// La racine n'est active que sur elle-même, les autres sur leurs sous-pages
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
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
