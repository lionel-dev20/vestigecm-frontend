<script setup lang="ts">
import type { HomeContent } from '#shared/types/home'

// Contenu géré dans WordPress (ACF, onglet « 12. À propos ») ; html déjà nettoyé côté serveur
const props = defineProps<HomeContent['about']>()

const expanded = ref(false)
const contentId = useId()
const heading = useTemplateRef<HTMLElement>('heading')

// « Nom · Adresse » sur deux lignes ; numéro WhatsApp → lien de conversation
const addressLines = computed(() => props.address.split('·').map(line => line.trim()).filter(Boolean))
const whatsappLink = computed(() => {
  const digits = props.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${digits.startsWith('237') ? digits : `237${digits}`}`
})

function toggle() {
  expanded.value = !expanded.value
  // En repliant un long texte, on ramène le titre à l'écran
  if (!expanded.value && heading.value && heading.value.getBoundingClientRect().top < 0) {
    heading.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section aria-labelledby="about-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <div class="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8 lg:p-10">
      <h2 id="about-title" ref="heading" class="scroll-mt-28 text-lg font-bold uppercase leading-snug text-ink lg:text-2xl">
        {{ title }}
      </h2>

      <!-- Replié : 5 lignes (max-h-30 = 5 × leading-6) ; space-y-6 = 1 ligne, la coupure tombe entre deux lignes. Texte complet dans le HTML (SEO) -->
      <div :id="contentId" class="mt-4 space-y-6 leading-6 text-[#333]" :class="expanded ? '' : 'max-h-30 overflow-hidden'">
        <!-- Texte enrichi WordPress : mise en forme des titres, listes et liens -->
        <div
          class="space-y-6 [&_a]:font-semibold [&_a]:text-leaf [&_a]:underline [&_h3]:pt-2 [&_h3]:font-bold [&_h3]:text-ink [&_li::marker]:text-leaf [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-5"
          v-html="html"
        />

        <address v-if="addressLines.length || whatsapp" class="space-y-1.5 rounded-xl bg-panel p-4 not-italic">
          <p v-if="addressLines[0]" class="flex items-center gap-2 font-bold text-ink">
            <UIcon name="i-lucide-map-pin" class="size-5 text-leaf" />
            {{ addressLines[0] }}
          </p>
          <p v-for="line in addressLines.slice(1)" :key="line" class="pl-7">{{ line }}</p>
          <p v-if="whatsapp" class="flex items-center gap-2">
            <UIcon name="i-simple-icons-whatsapp" class="size-5 text-leaf" />
            <NuxtLink :to="whatsappLink" target="_blank" class="font-semibold text-leaf hover:underline">
              WhatsApp : {{ whatsapp }}
            </NuxtLink>
          </p>
        </address>
      </div>

      <button
        type="button"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        class="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-semibold text-leaf hover:underline"
        @click="toggle"
      >
        {{ expanded ? 'Voir moins' : 'Voir plus' }}
        <UIcon :name="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="size-4" />
      </button>
    </div>
  </section>
</template>
