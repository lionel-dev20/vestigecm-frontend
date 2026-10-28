<script setup lang="ts">
const { subtotal } = useCart()

// Reste à dépenser pour la livraison offerte
const missing = computed(() => Math.max(0, freeDeliveryThreshold - subtotal.value))
const progress = computed(() => Math.min(100, (subtotal.value / freeDeliveryThreshold) * 100))
</script>

<template>
  <div class="rounded-2xl border border-ink/10 bg-white p-5 lg:p-6">
    <h2 class="text-xl font-bold text-[#222]">Récapitulatif</h2>

    <div class="mt-4 border-y border-ink/10 py-4 text-sm text-[#333]">
      <p v-if="missing">
        Plus que <strong>{{ formatPrice(missing) }}</strong> pour profiter de la <strong>livraison offerte</strong>
      </p>
      <p v-else class="flex items-center gap-2 font-semibold text-leaf">
        <UIcon name="i-lucide-truck" class="size-5" />
        Livraison offerte
      </p>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-panel" role="progressbar" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
        <div class="h-full rounded-full bg-leaf" :style="{ width: `${progress}%` }" />
      </div>
    </div>

    <dl class="mt-4 space-y-3">
      <div class="flex justify-between text-[#333]">
        <dt>Sous-total</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
      <div class="flex justify-between text-[#333]">
        <dt>Livraison</dt>
        <dd>{{ missing ? 'Calculée à l\'étape suivante' : 'Offerte' }}</dd>
      </div>
      <div class="flex justify-between border-t border-ink/10 pt-3 text-lg font-bold text-[#222]">
        <dt>Total</dt>
        <dd>{{ formatPrice(subtotal) }}</dd>
      </div>
    </dl>

    <NuxtLink
      to="/commande"
      class="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-cta font-bold uppercase text-white transition-colors duration-150 hover:bg-cta/90"
    >
      <UIcon name="i-lucide-lock" class="size-4" />
      Commander
    </NuxtLink>
  </div>
</template>
