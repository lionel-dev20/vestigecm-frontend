<script setup lang="ts">
import type { Testimonial } from '~/utils/testimonials'

const props = defineProps<Testimonial>()

// Vidéo chargée seulement au clic : rien n'est téléchargé tant qu'on ne lance pas la lecture
const playing = ref(false)
const isKit = computed(() => props.to.startsWith('/p/kit-'))
</script>

<template>
  <article class="flex h-full flex-col overflow-hidden rounded-2xl bg-panel">
    <div class="relative aspect-[3/4] bg-ink">
      <video
        v-if="playing"
        :src="video"
        controls
        autoplay
        playsinline
        class="absolute inset-0 size-full object-contain"
      />
      <button
        v-else
        type="button"
        :aria-label="`Lire le témoignage : ${topic}`"
        class="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 text-white"
        @click="playing = true"
      >
        <span class="flex size-16 items-center justify-center rounded-full bg-white text-ink transition-transform duration-150 group-hover:scale-105">
          <UIcon name="i-lucide-play" class="ml-1 size-7" />
        </span>
        <span class="px-4 text-center font-semibold">Regarder le témoignage</span>
      </button>
    </div>

    <div class="flex items-center justify-between gap-3 p-4">
      <p class="font-semibold text-[#222]">{{ topic }}</p>
      <NuxtLink :to="to" class="shrink-0 text-sm font-semibold text-link hover:underline">
        {{ isKit ? 'Voir le kit' : 'Voir' }}
      </NuxtLink>
    </div>
  </article>
</template>
