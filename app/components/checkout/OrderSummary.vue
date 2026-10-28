<script setup lang="ts">
const { items, count, subtotal } = useCart()
const free = computed(() => subtotal.value >= freeDeliveryThreshold)
</script>

<template>
  <div class="rounded-2xl border border-ink/10 bg-white p-5 lg:p-6">
    <div class="flex items-baseline justify-between">
      <h2 class="text-lg font-bold text-[#222]">Votre commande <span class="font-normal text-[#666]">({{ count }})</span></h2>
      <NuxtLink to="/panier" class="text-sm font-semibold text-leaf hover:underline">Modifier</NuxtLink>
    </div>

    <ul class="mt-4 space-y-4 border-b border-ink/10 pb-4">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-3">
        <div class="relative size-14 shrink-0 rounded-lg bg-[#f3f3f3] p-1.5">
          <NuxtImg :src="item.image" :alt="item.name" width="56" height="56" densities="x1 x2" format="webp" class="size-full object-contain mix-blend-multiply" />
          <span class="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">{{ item.quantity }}</span>
        </div>
        <p class="line-clamp-2 min-w-0 flex-1 text-sm text-[#333]">{{ item.name }}</p>
        <p class="shrink-0 text-sm font-semibold text-[#222]">{{ formatPrice(item.price * item.quantity) }}</p>
      </li>
    </ul>

    <dl class="mt-4 space-y-2 text-[#333]">
      <div class="flex justify-between">
        <dt>Sous-total</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
      <div class="flex justify-between">
        <dt>Livraison</dt>
        <dd :class="free && 'font-semibold text-leaf'">{{ free ? 'Offerte' : 'Confirmée par téléphone' }}</dd>
      </div>
      <div class="flex justify-between border-t border-ink/10 pt-3 text-lg font-bold text-[#222]">
        <dt>Total</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
    </dl>
  </div>
</template>
