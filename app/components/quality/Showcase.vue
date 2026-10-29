<script setup lang="ts">
import type { ShowcaseItem } from '#shared/types/showcase'

// Contenu géré dans WordPress (ACF, onglet « 3. Promesse qualité »)
defineProps<{ title: string; text: string; cards: ShowcaseItem[] }>()
</script>

<template>
  <!-- Fond vert limité au conteneur, comme les autres blocs -->
  <section aria-labelledby="quality-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <!-- Bureau : texte à gauche, cartes à droite -->
    <div class="flex flex-col gap-8 rounded-2xl bg-mint px-4 py-10 sm:px-8 lg:flex-row lg:gap-12 lg:px-12 lg:py-14">
      <div class="max-w-xl lg:w-80 lg:shrink-0">
        <h2 id="quality-title" class="flex items-center gap-2 text-2xl font-bold text-leaf">
          <UIcon name="i-lucide-badge-check" class="size-7" />
          {{ title }}
        </h2>
        <p class="mt-2 text-[#222]">{{ text }}</p>
      </div>

      <div class="min-w-0 flex-1">
        <QualityCardGrid :items="cards" />
      </div>
    </div>
  </section>
</template>
