<script setup lang="ts">
const { data, status, execute } = useShowcase()

// Les cartes ne sont chargées qu'à l'approche du scroll
const grid = useTemplateRef<HTMLElement>('grid')
const inView = useInView(grid)
watch(inView, () => execute(), { once: true })
</script>

<template>
  <!-- Fond vert limité au conteneur, comme les autres blocs -->
  <section aria-labelledby="quality-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <!-- Bureau : texte à gauche, cartes à droite -->
    <div class="flex flex-col gap-8 rounded-2xl bg-mint px-4 py-10 sm:px-8 lg:flex-row lg:gap-12 lg:px-12 lg:py-14">
      <!-- Texte statique : rendu serveur pour le SEO -->
      <div class="max-w-xl lg:w-80 lg:shrink-0">
        <h2 id="quality-title" class="flex items-center gap-2 text-2xl font-bold text-leaf">
          <UIcon name="i-lucide-badge-check" class="size-7" />
          Notre promesse qualité
        </h2>
        <p class="mt-2 text-[#222]">
          La médecine naturelle indienne (Ayurvéda) est désormais chez vous, grâce à la thérapie nutritionnelle cellulaire.
        </p>
      </div>

      <div ref="grid" class="min-w-0 flex-1">
        <QualityCardGrid :items="data" :loading="status !== 'success'" />
      </div>
    </div>
  </section>
</template>
