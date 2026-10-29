<script setup lang="ts">
// Chargement impossible (boutique injoignable, réseau coupé…) : message clair + nouvel essai
withDefaults(defineProps<{ message?: string }>(), { message: 'Impossible de charger les produits pour le moment.' })
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div role="alert" class="flex flex-col items-center gap-3 rounded-2xl bg-panel px-6 py-8 text-center">
    <UIcon name="i-lucide-wifi-off" class="size-10 text-[#999]" />
    <p class="font-semibold text-[#222]">{{ message }}</p>
    <p class="text-sm text-[#666]">Vérifiez votre connexion, puis réessayez.</p>
    <button
      type="button"
      class="mt-2 flex cursor-pointer items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
      @click="emit('retry')"
    >
      <UIcon name="i-lucide-rotate-cw" class="size-4" />
      Réessayer
    </button>
  </div>
</template>
