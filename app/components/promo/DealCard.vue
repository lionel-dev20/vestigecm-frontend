<script setup lang="ts">
const props = withDefaults(defineProps<{
  badge: string
  title: string
  // Partie du titre mise en couleur (doit figurer dans title)
  highlight?: string
  text: string
  cta: string
  to: string
  image: string
  tone?: 'light' | 'dark'
}>(), { tone: 'light' })

const dark = computed(() => props.tone === 'dark')

// Image à droite, couleur de secours selon le ton
const background = useCardBackground(() => ({ image: props.image, bg: dark.value ? '#1f4d2b' : '#f3efe8' }), 1200)

const parts = computed(() => splitHighlight(props.title, props.highlight))
</script>

<template>
  <NuxtLink
    :to="to"
    :style="background"
    class="group flex min-h-64 flex-col items-start justify-center rounded-2xl bg-cover bg-right p-6 outline-none focus-visible:ring-2 focus-visible:ring-forest sm:min-h-72 sm:p-8 lg:p-10"
    :class="dark ? 'text-white' : 'text-[#222]'"
  >
    <!-- Texte limité à ~60 % : l'image occupe la droite -->
    <div class="max-w-[60%]">
      <span
        class="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
        :class="dark ? 'bg-white/15 text-white' : 'bg-gold text-white'"
      >
        {{ badge }}
      </span>

      <h3 class="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
        {{ parts.before }}<span class="text-gold">{{ parts.accent }}</span>{{ parts.after }}
      </h3>

      <p class="mt-3 text-sm sm:text-base" :class="dark ? 'text-white/75' : 'text-[#666]'">{{ text }}</p>

      <span
        class="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-150"
        :class="dark ? 'bg-white text-forest group-hover:bg-white/90' : 'bg-forest text-white group-hover:bg-forest/90'"
      >
        {{ cta }}
        <UIcon name="i-lucide-arrow-right" class="size-4" />
      </span>
    </div>
  </NuxtLink>
</template>
