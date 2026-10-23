<template>
  <div class="flex items-center gap-4 lg:gap-8">
    <NuxtLink to="/account" aria-label="Mon compte" class="p-1">
      <UIcon name="i-lucide-user" class="size-6 lg:size-7" />
    </NuxtLink>
    <NuxtLink to="/basket" aria-label="Panier" class="p-1">
      <UIcon name="i-lucide-shopping-basket" class="size-6 lg:size-7" />
    </NuxtLink>
  </div>
</template>
