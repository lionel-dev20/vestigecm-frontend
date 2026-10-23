<script setup lang="ts">
const props = withDefaults(defineProps<{ image?: string }>(), {
  image: '/images/footer/background.jpg',
})

// L'image de fond n'est chargée qu'à l'approche du footer
const panel = useTemplateRef<HTMLElement>('panel')
const inView = useInView(panel)
const background = useCardBackground(() => ({ image: props.image, bg: '#1c2b2b' }), 1400)
const panelStyle = computed(() => (inView.value ? background.value : { backgroundColor: '#1c2b2b' }))

const year = new Date().getFullYear()
</script>

<template>
  <!-- Bureau : image + inscription à gauche, liens à droite · Mobile : empilés -->
  <footer class="grid bg-ink text-white lg:grid-cols-[2fr_3fr]">
    <div
      ref="panel"
      :style="panelStyle"
      class="flex min-h-96 flex-col justify-between gap-10 bg-cover bg-center px-4 py-10 sm:px-8 lg:px-12 lg:py-12"
    >
      <FooterSignup />

      <div class="space-y-5">
        <FooterSocial />
        <p class="text-sm text-white/80">© {{ year }} VESTIGE. Tous droits réservés.</p>
      </div>
    </div>

    <nav aria-label="Pied de page" class="grid grid-cols-2 gap-x-6 gap-y-10 px-4 py-10 sm:px-8 lg:px-12 lg:py-16 xl:grid-cols-4">
      <div v-for="column in footerColumns" :key="column.title">
        <h2 class="font-bold">{{ column.title }}</h2>
        <ul class="mt-5 space-y-4">
          <li v-for="link in column.links" :key="link.to">
            <NuxtLink :to="link.to" class="text-white/85 transition-colors duration-150 hover:text-white hover:underline">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>
