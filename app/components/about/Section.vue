<script setup lang="ts">
const expanded = ref(false)
const contentId = useId()
const title = useTemplateRef<HTMLElement>('title')

const services = [
  { name: 'Bilan Quantum', text: 'Un outil d\'évaluation complémentaire utilisé dans notre démarche de santé et bien-être.' },
  { name: 'Bilan Bioplasm', text: 'Une autre méthode d\'évaluation complémentaire permettant de recueillir différentes informations sur l\'organisme.' },
  { name: 'Produits naturels Vestige', text: 'Une gamme de produits intégrée à notre approche, avec des conseils adaptés à l\'alimentation et à l\'hygiène de vie.' },
  { name: 'Thérapie Tera Hertz', text: 'Une prestation proposée dans le cadre du bien-être et du confort corporel, qui aide à réactiver la circulation sanguine.' },
  { name: 'Détoxification ionique', text: 'Une séance complémentaire de bien-être et de détente qui aide à éliminer les toxines du corps.' },
]
const steps = ['Évaluer', 'Comprendre', 'Personnaliser', 'Accompagner']

function toggle() {
  expanded.value = !expanded.value
  // En repliant un long texte, on ramène le titre à l'écran
  if (!expanded.value && title.value && title.value.getBoundingClientRect().top < 0) {
    title.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section aria-labelledby="about-title" class="mx-auto max-w-350 px-4 py-6 lg:px-8">
    <div class="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8 lg:p-10">
      <h2 id="about-title" ref="title" class="scroll-mt-28 text-lg font-bold uppercase leading-snug text-ink lg:text-2xl">
        Vous souffrez de douleurs articulaires, de lombalgies, de troubles digestifs, de fatigue persistante,
        ou vous vivez avec une maladie chronique comme le diabète ou l'hypertension&nbsp;?
      </h2>

      <!-- Replié : 5 lignes (max-h-30 = 5 × leading-6) ; space-y-6 = 1 ligne, la coupure tombe entre deux lignes. Texte complet dans le HTML (SEO) -->
      <div :id="contentId" class="mt-4 space-y-6 leading-6 text-[#333]" :class="expanded ? '' : 'max-h-30 overflow-hidden'">
        <p class="font-semibold">
          Et si, avant de chercher uniquement à faire disparaître les symptômes, vous commenciez par mieux comprendre
          ce qui se passe dans votre organisme&nbsp;?
        </p>
        <p>Vous avez déjà essayé différentes solutions, mais vos problèmes persistent ou reviennent régulièrement&nbsp;?</p>
        <p>
          Bienvenue chez <strong>VESTIGE CAMEROUN – DOUALA LOGBABA</strong>, votre espace dédié à une approche globale
          de la santé et du bien-être, inspirée des principes de la médecine ayurvédique indienne, avec une attention
          particulière portée à l'alimentation, à l'hygiène de vie et à l'équilibre global.
        </p>

        <h3 class="flex items-center gap-2 pt-2 font-bold uppercase text-ink">
          <UIcon name="i-lucide-search" class="size-5 text-leaf" />
          Chez nous, le bilan est la première étape
        </h3>
        <p>Avant toute prise en charge ou tout accompagnement, nous commençons par un bilan au Quantum ou au Bioplasm.</p>
        <p>
          L'objectif est de recueillir davantage d'informations sur certains paramètres de l'organisme afin de mieux
          orienter et personnaliser l'accompagnement proposé.
        </p>

        <h3 class="flex items-center gap-2 pt-2 font-bold text-ink">
          <UIcon name="i-lucide-leaf" class="size-5 text-leaf" />
          Notre approche repose ensuite sur plusieurs prestations complémentaires
        </h3>
        <ul class="space-y-3">
          <li v-for="service in services" :key="service.name" class="flex gap-3">
            <UIcon name="i-lucide-circle-check" class="mt-0.5 size-5 shrink-0 text-leaf" />
            <p><strong>{{ service.name }}</strong> — {{ service.text }}</p>
          </li>
        </ul>

        <h3 class="flex items-center gap-2 pt-2 font-bold text-ink">
          <UIcon name="i-lucide-sparkles" class="size-5 text-leaf" />
          Notre principe est simple
        </h3>
        <ol class="flex flex-wrap items-center gap-2 font-bold uppercase text-leaf">
          <li v-for="(step, index) in steps" :key="step" class="flex items-center gap-2">
            <UIcon v-if="index > 0" name="i-lucide-arrow-right" class="size-4 text-[#999]" aria-hidden="true" />
            {{ step }}
          </li>
        </ol>
        <p>
          Parce que chaque personne est différente, nous ne voulons pas simplement vous proposer une solution au hasard.
          Nous privilégions une démarche qui commence par l'écoute et l'évaluation, puis qui permet d'orienter
          l'accompagnement en fonction des besoins identifiés.
        </p>

        <address class="space-y-1.5 rounded-xl bg-panel p-4 not-italic">
          <p class="flex items-center gap-2 font-bold text-ink">
            <UIcon name="i-lucide-map-pin" class="size-5 text-leaf" />
            VESTIGE CAMEROUN – DOUALA LOGBABA
          </p>
          <p class="pl-7">Logbaba 2 Poteaux</p>
          <p class="flex items-center gap-2">
            <UIcon name="i-simple-icons-whatsapp" class="size-5 text-leaf" />
            <NuxtLink to="https://wa.me/237676653634" target="_blank" class="font-semibold text-leaf hover:underline">
              WhatsApp : 676 653 634
            </NuxtLink>
          </p>
        </address>

        <p class="font-semibold text-ink">
          Prenez soin de votre santé. Commencez par mieux comprendre votre organisme.
        </p>
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
