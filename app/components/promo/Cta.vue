<script setup lang="ts">
const props = defineProps<{
  eyebrow: string
  title: string
  // Partie du titre mise en couleur (doit figurer dans title)
  highlight?: string
  text: string
  cta: string
  to: string
  image: string
}>()

// Vert foncé de secours tant que l'image n'est pas chargée
const background = useCardBackground(() => ({ image: props.image, bg: '#1f4d2b' }), 2400)
const parts = computed(() => splitHighlight(props.title, props.highlight))
</script>

<template>
  <section class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <!-- Toute la bannière est un seul lien ; le bouton n'est qu'un style -->
    <NuxtLink
      :to="to"
      :style="background"
      class="group flex min-h-60 items-center rounded-2xl bg-cover bg-right px-6 py-10 text-white outline-none focus-visible:ring-2 focus-visible:ring-forest sm:px-10 lg:min-h-72 lg:px-14"
    >
      <!-- Texte sur la moitié gauche : l'image occupe la droite -->
      <div class="max-w-xl sm:max-w-[55%]">
        <p class="text-sm font-medium lg:text-base">{{ eyebrow }}</p>
        <h2 class="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          {{ parts.before }}<span class="text-gold">{{ parts.accent }}</span>{{ parts.after }}
        </h2>
        <p class="mt-3 text-sm text-white/80 lg:text-base">{{ text }}</p>
        <span
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest transition-colors duration-150 group-hover:bg-white/90"
        >
          {{ cta }}
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </span>
      </div>
    </NuxtLink>
  </section>
</template>
