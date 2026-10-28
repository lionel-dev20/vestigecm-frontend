<script setup lang="ts">
const props = defineProps<{ images: string[]; alt: string }>()

const active = ref(0)
const current = computed(() => props.images[active.value] ?? props.images[0])

// Pendant le chargement de la grande image : la vignette de la carte (déjà en cache) s'affiche dessous
// image-set : même choix 1x / 2x que le srcset de la carte, donc la même URL déjà téléchargée
const img = useImage()
const thumbnail = computed(() => {
  const size = (width: number) => img(current.value ?? '', { width, height: width, format: 'webp' })
  return { backgroundImage: `image-set(url('${size(240)}') 1x, url('${size(480)}') 2x)` }
})
</script>

<template>
  <!-- Bureau : hauteur imposée par le parent via --gallery-h (576px par défaut) -->
  <div class="flex gap-3 lg:h-(--gallery-h,36rem)">
    <!-- Miniatures à gauche : h-0 + min-h-full = suivent la hauteur de l'image sans l'agrandir -->
    <ul
      v-if="images.length > 1"
      class="scrollbar-none flex h-0 min-h-full w-16 shrink-0 flex-col gap-3 overflow-y-auto lg:w-20"
      aria-label="Autres vues"
    >
      <li v-for="(image, index) in images" :key="index">
        <button
          type="button"
          :aria-label="`Vue ${index + 1}`"
          :aria-pressed="active === index"
          class="block aspect-square w-full overflow-hidden rounded-xl border-2 bg-[#f3f3f3] p-1.5 cursor-pointer transition-colors duration-150"
          :class="active === index ? 'border-ink' : 'border-transparent hover:border-ink/20'"
          @click="active = index"
        >
          <NuxtImg
            :src="image"
            alt=""
            width="80"
            height="80"
            densities="x1 x2"
            format="webp"
            loading="lazy"
            class="size-full object-contain mix-blend-multiply"
          />
        </button>
      </li>
    </ul>

    <!-- Même fond gris que les cartes produit de l'accueil -->
    <div
      :style="thumbnail"
      class="aspect-square min-w-0 flex-1 overflow-hidden rounded-2xl bg-[#f3f3f3] bg-contain bg-center bg-no-repeat bg-origin-content bg-blend-multiply p-6 lg:aspect-auto lg:p-10"
    >
      <!-- Image principale = LCP : chargée en priorité -->
      <NuxtImg
        :src="current"
        :alt="alt"
        width="640"
        height="640"
        densities="x1 x2"
        format="webp"
        fetchpriority="high"
        class="size-full object-contain mix-blend-multiply"
      />
    </div>
  </div>
</template>
