<script setup lang="ts" generic="T">
const props = withDefaults(defineProps<{
  items: T[]
  label: string
  itemKey?: (item: T, index: number) => string | number
  // Éléments visibles par largeur d'écran (classes littérales pour Tailwind)
  colsClass?: string
  // Hauteur des flèches, alignées sur le visuel des éléments
  arrowClass?: string
  // Défilement automatique toutes les N ms (0 = désactivé)
  autoplay?: number
}>(), {
  colsClass: '[--cols:2] sm:[--cols:3] md:[--cols:4] lg:[--cols:5] xl:[--cols:6]',
  arrowClass: 'top-[22%]',
  autoplay: 0,
})

const track = useTemplateRef<HTMLElement>('track')
const canPrev = ref(false)
const canNext = ref(true)

function update() {
  const el = track.value
  if (!el) return
  canPrev.value = el.scrollLeft > 1
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

// Défile d'un écran : autant d'éléments que l'appareil en affiche
function go(direction: 1 | -1) {
  track.value?.scrollBy({ left: direction * track.value.clientWidth, behavior: 'smooth' })
}

// Autoplay : un élément à la fois, retour au début en fin de liste
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function step() {
  const el = track.value
  if (!el || paused.value) return
  if (!canNext.value) return el.scrollTo({ left: 0, behavior: 'smooth' })
  const item = el.firstElementChild as HTMLElement | null
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  el.scrollBy({ left: (item?.offsetWidth ?? 0) + gap, behavior: 'smooth' })
}

onMounted(() => {
  update()
  // Respecte le réglage « réduire les animations » du système
  if (props.autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(step, props.autoplay)
  }
})
onBeforeUnmount(() => clearInterval(timer))
watch(() => props.items.length, () => nextTick(update))
</script>

<template>
  <!-- Pause pendant que l'utilisateur survole, touche ou navigue au clavier -->
  <div
    class="relative"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @touchstart.passive="paused = true"
    @touchend="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <ul
      ref="track"
      :aria-label="label"
      class="scrollbar-none flex snap-x snap-mandatory gap-(--gap) overflow-x-auto [--gap:1rem]"
      :class="colsClass"
      @scroll.passive="update"
    >
      <li v-for="(item, index) in items" :key="itemKey?.(item, index) ?? index" class="carousel-item shrink-0 snap-start">
        <slot name="item" :item="item" :index="index" />
      </li>
    </ul>

    <!-- Tactile : on glisse ; souris : flèches -->
    <button
      v-show="canPrev"
      type="button"
      aria-label="Précédent"
      class="absolute left-2 hidden size-13 items-center justify-center rounded-full border border-ink/20 bg-white text-ink md:flex xl:left-0 xl:-translate-x-1/2"
      :class="arrowClass"
      @click="go(-1)"
    >
      <UIcon name="i-lucide-chevron-left" class="size-6" />
    </button>
    <button
      v-show="canNext"
      type="button"
      aria-label="Suivant"
      class="absolute right-2 hidden size-13 items-center justify-center rounded-full border border-ink/20 bg-white text-ink md:flex xl:right-0 xl:translate-x-1/2"
      :class="arrowClass"
      @click="go(1)"
    >
      <UIcon name="i-lucide-chevron-right" class="size-6" />
    </button>
  </div>
</template>
