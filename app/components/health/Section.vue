<script setup lang="ts">
import type { HomeContent } from '#shared/types/home'

// Contenu géré dans WordPress (ACF, onglet « 5. Santé & maladies »)
const props = defineProps<HomeContent['health']>()

// Bandeau : bleu de secours + photo optimisée
const background = useCardBackground(() => ({ image: props.image, bg: '#0b3f8c' }), 1600)

// Grand écran : 7 maladies visibles, les suivantes via les flèches
const cols = '[--cols:3] sm:[--cols:4] md:[--cols:6] lg:[--cols:7]'
</script>

<template>
  <section aria-labelledby="health-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <div class="overflow-hidden rounded-2xl">
      <div :style="background" class="bg-cover bg-right px-5 py-8 text-white sm:px-8 lg:px-12 lg:py-12">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <h2 id="health-title" class="flex items-center gap-3 text-3xl font-bold lg:text-5xl">
            <UIcon name="i-lucide-heart-pulse" class="size-9 lg:size-12" />
            {{ title }}
          </h2>
          <NuxtLink
            :to="to"
            class="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-[#222] transition-colors duration-150 hover:bg-white/90"
          >
            {{ label }}
            <UIcon name="i-lucide-arrow-right" class="size-5" />
          </NuxtLink>
        </div>

        <p class="mt-5 max-w-4xl text-lg lg:text-xl">{{ intro }}</p>

        <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-4">
          <HealthFeature v-for="feature in features" :key="feature.text" v-bind="feature" />
        </ul>
      </div>

      <div v-if="kits.length" class="bg-sky px-5 py-8 sm:px-8 lg:px-12">
        <BaseCarousel
          :items="kits"
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
