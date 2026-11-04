<script setup lang="ts">
import type { TestimonialsPage } from '#shared/types/pages'

// Bannière, textes et vidéos gérés dans WordPress (page « Témoignages » + menu « Témoignages »)
const { data: page } = await useFetch<TestimonialsPage>('/api/pages/temoignages', { key: 'page-temoignages' })

useSeoMeta({
  title: 'Témoignages',
  description: 'Ils utilisent les produits naturels VESTIGE : découvrez leurs témoignages en vidéo.',
})

// Filtre par sujet (Diabète, Arthrite…), dans l'ordre d'apparition ; « Tous » par défaut
const topic = ref<string>()
const topics = computed(() => [...new Set(page.value?.items.map(item => item.topic))])
const list = computed(() => page.value?.items.filter(item => !topic.value || item.topic === topic.value) ?? [])
</script>

<template>
  <div v-if="page" class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Témoignages' }]" />

    <!-- Bannière : le titre « NOS Témoignages » est dans l'image -->
    <h1 class="sr-only">Nos témoignages</h1>
    <NuxtImg
      :src="page.banner"
      alt="VESTIGE – Nos témoignages"
      width="1080"
      height="607"
      sizes="100vw lg:1024px"
      format="webp"
      preload
      fetchpriority="high"
      class="mx-auto mt-4 w-full max-w-5xl rounded-2xl"
    />

    <p class="mx-auto mt-6 max-w-2xl text-center text-lg text-[#555]">{{ page.intro }}</p>

    <!-- Filtres : défilent horizontalement sur mobile -->
    <div v-if="topics.length > 1" class="scrollbar-none -mx-4 mt-6 overflow-x-auto px-4">
      <ul class="flex w-max gap-2" aria-label="Sujets">
        <li v-for="item in [undefined, ...topics]" :key="item ?? 'tous'">
          <button
            type="button"
            :aria-pressed="topic === item"
            class="cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150"
            :class="topic === item ? 'border-ink bg-ink text-white' : 'border-ink/20 text-[#222] hover:bg-panel'"
            @click="topic = item"
          >
            {{ item ?? 'Tous' }}
          </button>
        </li>
      </ul>
    </div>

    <!-- 1 carte sur mobile, 2 sur tablette, 4 sur ordinateur -->
    <ul class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="item in list" :key="item.id">
        <TestimonialCard v-bind="item" />
      </li>
    </ul>

    <div class="mx-auto mt-12 max-w-xl rounded-2xl bg-panel p-8 text-center">
      <p class="font-semibold text-[#222]">{{ page.cta.title }}</p>
      <p class="mt-1 text-[#666]">{{ page.cta.text }}</p>
      <NuxtLink
        :to="whatsappLink(page.cta.message)"
        target="_blank"
        class="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
      >
        <UIcon name="i-simple-icons-whatsapp" class="size-5" />
        {{ page.cta.label }}
      </NuxtLink>
    </div>
  </div>
</template>
