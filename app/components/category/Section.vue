<script setup lang="ts">
// Textes gérés dans WordPress (ACF, onglet « 8. Catégories ») ; catégories depuis WooCommerce
const props = defineProps<{ eyebrow: string; title: string; highlight: string }>()
const parts = computed(() => splitHighlight(props.title, props.highlight))

const { data, status, execute } = useCategories()
// En chargement tant que la réponse n'est pas arrivée (une erreur termine le chargement)
const loading = computed(() => status.value === 'idle' || status.value === 'pending')

// Les catégories ne sont chargées qu'à l'approche du scroll
const section = useTemplateRef<HTMLElement>('section')
const inView = useInView(section)
watch(inView, () => execute(), { once: true })

const placeholders = Array.from({ length: 6 })
const cols = '[--cols:3] sm:[--cols:4] md:[--cols:5] lg:[--cols:6]'
</script>

<template>
  <!-- Fond crème limité au conteneur, comme les autres blocs -->
  <section v-if="loading || data.length" ref="section" aria-labelledby="category-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <div class="rounded-2xl bg-cream px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
      <!-- En-tête statique : rendu serveur pour le SEO -->
      <div class="mb-8 text-center">
        <p class="text-sm text-[#555]">{{ eyebrow }}</p>
        <h2 id="category-title" class="mt-1 text-3xl font-bold text-[#222] lg:text-4xl">
          {{ parts.before }}<span class="text-gold">{{ parts.accent }}</span>{{ parts.after }}
        </h2>
      </div>

      <BaseCarousel v-if="loading" :items="placeholders" :cols-class="cols" arrow-class="top-[35%]" label="Chargement des catégories">
        <template #item>
          <CategoryItemSkeleton />
        </template>
      </BaseCarousel>

      <BaseCarousel
        v-else
        :items="data"
        :item-key="(category) => category.id"
        :cols-class="cols"
        arrow-class="top-[35%]"
        label="Acheter par catégorie"
      >
        <template #item="{ item }">
          <CategoryItem v-bind="item" />
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>
