<script setup lang="ts">
const code = ref('')
const toast = useToast()

// À brancher sur les codes promo WooCommerce (/wp-json/wc/v3/coupons)
function apply() {
  if (!code.value.trim()) return
  toast.add({ title: 'Code promo', description: `Le code « ${code.value.trim()} » sera vérifié à la commande.`, icon: 'i-lucide-ticket' })
}
</script>

<template>
  <!-- Toujours visible : pas de repli -->
  <div class="border-b border-ink/10 py-4">
    <label for="promo-code" class="mb-3 block font-semibold text-[#222]">Ajouter un code promo</label>
    <form class="flex gap-2" @submit.prevent="apply">
      <input
        id="promo-code"
        v-model="code"
        type="text"
        placeholder="Votre code"
        class="h-11 min-w-0 flex-1 rounded-lg border border-ink/20 px-3 uppercase outline-none focus-visible:border-ink"
      >
      <button type="submit" class="h-11 cursor-pointer rounded-lg border border-ink/20 px-4 text-sm font-semibold uppercase text-[#222] hover:bg-panel">
        Appliquer
      </button>
    </form>
  </div>
</template>
