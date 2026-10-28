<script setup lang="ts">
import type { CartItem } from '~/composables/useCart'

const props = defineProps<{ item: CartItem }>()
const { setQuantity, remove } = useCart()

const quantity = computed({
  get: () => props.item.quantity,
  set: value => setQuantity(props.item.id, value),
})
</script>

<template>
  <!-- Mobile : image + infos, quantité et prix en dessous · Bureau : colonnes Produit / Quantité / Prix / Retirer -->
  <li class="grid grid-cols-[5rem_1fr_auto] gap-x-4 gap-y-3 border-b border-ink/10 py-5 md:grid-cols-[6rem_1fr_9rem_7rem_3rem] md:items-center">
    <NuxtLink :to="item.to" class="row-span-2 aspect-square overflow-hidden rounded-xl bg-[#f3f3f3] p-2 md:row-span-1">
      <NuxtImg :src="item.image" :alt="item.name" width="96" height="96" densities="x1 x2" format="webp" class="size-full object-contain mix-blend-multiply" />
    </NuxtLink>

    <div class="min-w-0">
      <NuxtLink :to="item.to" class="line-clamp-2 font-semibold text-[#222] hover:underline">{{ item.name }}</NuxtLink>
      <p class="mt-1 text-sm text-[#666]">{{ formatPrice(item.price) }} l'unité</p>
    </div>

    <button
      type="button"
      :aria-label="`Retirer ${item.name} du panier`"
      class="flex size-9 cursor-pointer items-center justify-center self-start rounded-full text-[#555] hover:bg-panel hover:text-[#222] md:order-last md:self-center"
      @click="remove(item.id)"
    >
      <UIcon name="i-lucide-x" class="size-5" />
    </button>

    <div class="col-span-2 flex items-center justify-between md:col-span-1 md:contents">
      <ProductQuantity v-model="quantity" />
      <p class="font-bold text-[#222] md:text-right">{{ formatPrice(item.price * item.quantity) }}</p>
    </div>
  </li>
</template>
