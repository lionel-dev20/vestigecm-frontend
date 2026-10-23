<script setup lang="ts">
const props = withDefaults(defineProps<{ image?: string }>(), {
  image: '/images/sante/banner.jpg',
})

// Bandeau : bleu de secours + photo optimisée
const background = useCardBackground(() => ({ image: props.image, bg: '#0b3f8c' }), 1600)

const features = [
  { icon: 'i-lucide-microscope', text: 'Des ingrédients étudiés dans la littérature scientifique' },
  { icon: 'i-lucide-badge-check', text: 'Une fabrication conforme aux normes de qualité (BPF)' },
  { icon: 'i-lucide-clipboard-list', text: 'Un étiquetage détaillé et une origine des ingrédients tracée' },
  { icon: 'i-lucide-stethoscope', text: 'L\'accompagnement de professionnels de santé' },
]

const { data, status, execute } = useHealthKits()
const loading = computed(() => status.value !== 'success')

// Les produits ne sont chargés qu'à l'approche du scroll
const kits = useTemplateRef<HTMLElement>('kits')
const inView = useInView(kits)
watch(inView, () => execute(), { once: true })

const placeholders = Array.from({ length: 7 })
// Grand écran : 7 maladies visibles, les suivantes via les flèches
const cols = '[--cols:3] sm:[--cols:4] md:[--cols:6] lg:[--cols:7]'
</script>

<template>
  <section aria-labelledby="health-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <div class="overflow-hidden rounded-2xl">
      <!-- Texte statique : rendu serveur pour le SEO -->
      <div :style="background" class="bg-cover bg-right px-5 py-8 text-white sm:px-8 lg:px-12 lg:py-12">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <h2 id="health-title" class="flex items-center gap-3 text-3xl font-bold lg:text-5xl">
            <UIcon name="i-lucide-heart-pulse" class="size-9 lg:size-12" />
            Santé &amp; maladies
          </h2>
          <NuxtLink
            to="/c/kit-maladies"
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-[#222] transition-colors duration-150 hover:bg-white/90"
          >
            En savoir plus
            <UIcon name="i-lucide-arrow-right" class="size-5" />
          </NuxtLink>
        </div>

        <p class="mt-5 max-w-4xl text-lg lg:text-xl">
          Chez VESTIGE, nous adoptons une approche holistique, qui agit à la racine des maladies,
          et non seulement sur les symptômes. Nous accompagnons efficacement des personnes souffrant de :
        </p>

        <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          <HealthFeature v-for="feature in features" :key="feature.icon" v-bind="feature" />
        </ul>
      </div>

      <div ref="kits" class="bg-sky px-5 py-8 sm:px-8 lg:px-12">
        <BaseCarousel
          v-if="loading"
          :items="placeholders"
          :cols-class="cols"
          arrow-class="top-[30%]"
          label="Chargement des kits santé"
        >
          <template #item>
            <HealthKitItemSkeleton />
          </template>
        </BaseCarousel>

        <BaseCarousel
          v-else
          :items="data"
          :item-key="(kit) => kit.id"
          :cols-class="cols"
          arrow-class="top-[30%]"
          label="Kits par maladie"
        >
          <template #item="{ item }">
            <HealthKitItem v-bind="item" />
          </template>
        </BaseCarousel>
      </div>
    </div>
  </section>
</template>
