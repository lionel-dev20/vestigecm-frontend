<script setup lang="ts">
const items = [
  { icon: 'i-lucide-truck', text: 'Livraison partout au Cameroun' },
  { icon: 'i-lucide-banknote', text: 'Paiement à la livraison ou Mobile Money' },
  { icon: 'i-lucide-badge-check', text: 'Produits authentiques et contrôlés' },
]
</script>

<template>
  <ul class="space-y-3 rounded-xl bg-panel p-4 text-sm text-[#333]">
    <li v-for="item in items" :key="item.icon" class="flex items-center gap-3">
      <UIcon :name="item.icon" class="size-5 shrink-0 text-leaf" />
      {{ item.text }}
    </li>
  </ul>
</template>
