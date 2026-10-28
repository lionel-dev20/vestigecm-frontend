<script setup lang="ts">
defineProps<{ price: number; inStock: boolean; loading?: boolean }>()
const quantity = defineModel<number>('quantity', { default: 1 })
const emit = defineEmits<{ buy: [] }>()
</script>

<template>
  <!-- Collée en bas de l'écran sur mobile, sans JavaScript (sticky) -->
  <div class="sticky bottom-0 z-20 border-t border-[#ececec] bg-white px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] lg:hidden">
    <p class="mb-2 text-sm text-[#555]">
      Total : <span class="font-bold text-sale">{{ formatPrice(price * quantity) }}</span>
    </p>
    <ProductPurchase v-model:quantity="quantity" :in-stock="inStock" :disabled="loading" @buy="emit('buy')" />
  </div>
</template>
