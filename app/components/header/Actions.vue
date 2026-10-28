<script setup lang="ts">
const { count } = useCart()
</script>

<template>
  <div class="flex items-center gap-4 lg:gap-8">
    <NuxtLink to="/account" aria-label="Mon compte" class="p-1">
      <UIcon name="i-lucide-user" class="size-6 lg:size-7" />
    </NuxtLink>
    <NuxtLink to="/panier" :aria-label="`Panier, ${count} article${count > 1 ? 's' : ''}`" class="relative p-1">
      <UIcon name="i-lucide-shopping-basket" class="size-6 lg:size-7" />
      <!-- Pastille du nombre d'articles, masquée si le panier est vide -->
      <span
        v-if="count"
        class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white"
      >
        {{ count > 99 ? '99+' : count }}
      </span>
    </NuxtLink>
  </div>
</template>
