<script setup lang="ts">
import type { Testimonial } from '#shared/types/pages'

defineProps<Testimonial>()

// Vidéo chargée seulement au clic : avant, seule l'affiche (quelques Ko) est téléchargée
const playing = ref(false)
</script>

<template>
  <article class="flex h-full flex-col overflow-hidden rounded-2xl bg-panel">
    <div class="relative aspect-video overflow-hidden bg-ink">
      <video
        v-if="playing"
        :src="video"
        :poster="poster || undefined"
        controls
        autoplay
        playsinline
        class="absolute inset-0 size-full object-contain"
      />
      <button
        v-else
        type="button"
        :aria-label="`Regarder le témoignage : ${topic}`"
        class="group absolute inset-0 cursor-pointer"
        @click="playing = true"
      >
        <!-- Sans couverture : fond uni et bouton lecture -->
        <NuxtImg
          v-if="poster"
          :src="poster"
          alt=""
          width="480"
          height="270"
          densities="x1 x2"
          format="webp"
          loading="lazy"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <!-- Voile léger pour que le bouton et les badges restent lisibles sur toutes les images -->
        <span class="absolute inset-0 bg-black/20 transition-colors duration-150 group-hover:bg-black/10" />

        <span class="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
          {{ topic }}
        </span>
        <span class="absolute inset-0 flex items-center justify-center">
          <span class="flex size-14 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform duration-150 group-hover:scale-110">
            <UIcon name="i-lucide-play" class="ml-1 size-6" />
          </span>
        </span>
        <span v-if="duration" class="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 text-xs font-semibold text-white">
          {{ duration }}
        </span>
      </button>
    </div>

    <div class="flex flex-1 items-center justify-between gap-3 p-4">
      <p class="font-semibold text-[#222]">Témoignage · {{ topic }}</p>
      <NuxtLink :to="to" class="shrink-0 text-sm font-semibold text-link hover:underline">
        {{ linkLabel }}
      </NuxtLink>
    </div>
  </article>
</template>
