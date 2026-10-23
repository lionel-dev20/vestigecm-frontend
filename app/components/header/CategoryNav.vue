<script setup lang="ts">
defineProps<{ links: NavLink[] }>()
</script>

<template>
  <!-- w-max + mx-auto : centré quand ça tient, défilement horizontal sinon -->
  <nav aria-label="Catégories" class="scrollbar-none overflow-x-auto">
    <ul class="mx-auto flex w-max items-center gap-6 px-4 lg:gap-7">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="flex items-center gap-1.5 whitespace-nowrap py-3 text-[14px] font-medium hover:underline underline-offset-8 lg:text-base"
        >
          <UIcon v-if="link.icon" :name="link.icon" class="size-5" />
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
