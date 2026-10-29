<script setup lang="ts">
defineProps<{ error?: string }>()
const rating = defineModel<number>({ default: 0 })

// Survol : aperçu de la note avant de cliquer
const hovered = ref(0)
const labels = ['Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Excellent']
const id = useId()
</script>

<template>
  <fieldset>
    <legend class="mb-1.5 font-semibold text-[#222]">Votre note</legend>
    <!-- Boutons radio natifs (clavier : flèches gauche / droite), affichés en étoiles -->
    <div class="flex items-center gap-1" @mouseleave="hovered = 0">
      <label v-for="n in 5" :key="n" class="cursor-pointer" @mouseenter="hovered = n">
        <input v-model="rating" type="radio" :name="id" :value="n" class="peer sr-only" :aria-label="`${n} sur 5 : ${labels[n - 1]}`">
        <span
          class="block text-4xl leading-none transition-colors duration-100 peer-focus-visible:rounded peer-focus-visible:ring-2 peer-focus-visible:ring-ink"
          :class="n <= (hovered || rating) ? 'text-star' : 'text-ink/15'"
          aria-hidden="true"
        >★</span>
      </label>
      <span class="ml-2 text-sm text-[#555]">{{ labels[(hovered || rating) - 1] ?? '' }}</span>
    </div>
    <p v-if="error" class="mt-1.5 flex items-center gap-1.5 text-sm text-sale">
      <UIcon name="i-lucide-circle-alert" class="size-4 shrink-0" />
      {{ error }}
    </p>
  </fieldset>
</template>
