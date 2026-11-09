<script setup lang="ts">
import type { CareerPage } from '#shared/types/pages'

// Contenu géré dans WordPress (page « Carrière », champs ACF)
const { data: page } = await useFetch<CareerPage>('/api/pages/carriere', { key: 'page-carriere' })

useSeoMeta({
  title: 'Carrière',
  description: () => page.value?.intro,
})
</script>

<template>
  <div v-if="page" class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Carrière' }]" />

    <NuxtImg
      v-if="page.banner"
      :src="page.banner"
      alt=""
      width="1200"
      height="500"
      sizes="100vw lg:1024px"
      format="webp"
      preload
      fetchpriority="high"
      class="mx-auto mt-4 w-full max-w-5xl rounded-2xl object-cover"
    />

    <div class="mx-auto max-w-3xl py-10 lg:py-16">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-[#222] lg:text-4xl">{{ page.title }}</h1>
        <p class="mt-4 text-lg leading-relaxed text-[#555]">{{ page.intro }}</p>
      </div>

      <ol class="mt-10 grid gap-4 sm:grid-cols-3">
        <li v-for="step in page.steps" :key="step.title" class="rounded-2xl bg-panel p-6">
          <UIcon :name="step.icon" class="size-8 text-leaf" />
          <h2 class="mt-3 font-bold text-[#222]">{{ step.title }}</h2>
          <p class="mt-1 text-[#555]">{{ step.text }}</p>
        </li>
      </ol>

      <!-- Kits d'adhésion : la porte d'entrée pour devenir distributeur -->
      <NuxtLink
        to="/c/kits-adhesion"
        class="mt-10 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-white transition-colors duration-150 hover:bg-ink/90 sm:flex-row sm:items-center sm:justify-between lg:p-8"
      >
        <span>
          <span class="block text-xl font-bold">Choisissez votre kit d'adhésion</span>
          <span class="mt-1 block text-white/85">11 kits pour démarrer, de 25 000 à 145 000 FCFA.</span>
        </span>
        <span class="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-ink">
          Voir les kits d'adhésion
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </span>
      </NuxtLink>

      <div class="mt-10 text-center">
        <NuxtLink
          :to="whatsappLink(page.cta.message)"
          target="_blank"
          class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          {{ page.cta.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
