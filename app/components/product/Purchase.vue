<script setup lang="ts">
// Quantité + bouton Acheter : utilisé dans la colonne (bureau) et la barre collée (mobile)
// disabled : stock pas encore confirmé (fiche en cours de chargement)
defineProps<{ inStock: boolean; disabled?: boolean }>()
const quantity = defineModel<number>('quantity', { default: 1 })
const emit = defineEmits<{ buy: [] }>()
</script>

<template>
  <div class="flex items-center gap-3">
    <ProductQuantity v-model="quantity" />
    <button
      type="button"
      :disabled="!inStock || disabled"
      class="flex h-12 flex-1 items-center cursor-pointer justify-center gap-2 rounded-full bg-ink px-6 font-bold uppercase text-white transition-colors duration-150 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      @click="emit('buy')"
    >
      <UIcon name="i-lucide-shopping-basket" class="size-5" />
      {{ inStock ? 'Acheter' : 'Rupture de stock' }}
    </button>
  </div>
</template>
