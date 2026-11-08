<script setup lang="ts">
useSeoMeta({
  title: 'Bilans et thérapies',
  description: 'Bilan Quantum, Bilan Bioplasme, Thérapie Térahertz et Détoxification ionique chez VESTIGE Cameroun, à Douala Logbaba.',
})

// Rendez-vous par WhatsApp, avec la prestation choisie dans le message
const booking = (title: string) => whatsappLink(`Bonjour, je souhaite prendre rendez-vous pour : ${title}.`)
const steps = ['Évaluer', 'Comprendre', 'Personnaliser', 'Accompagner']

// Prestations détaillées dans « Les différents bilans » (même texte pour les deux)
const bilans = services.filter(service => service.id === 'quantum' || service.id === 'bioplasme')
const isBilan = (id: string) => bilans.some(bilan => bilan.id === id)
const detox = services.find(service => service.id === 'detoxification')!
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Bilans et thérapies' }]" />

    <div class="mx-auto max-w-3xl py-8 text-center lg:py-12">
      <h1 class="text-2xl font-bold text-[#222] lg:text-4xl">Bilans et thérapies</h1>
      <p class="mt-4 text-lg leading-relaxed text-[#555]">
        Chez nous, le bilan est la première étape. Avant tout accompagnement, nous recueillons des informations sur votre organisme pour vous proposer une démarche adaptée.
      </p>
      <!-- Notre principe, en 4 étapes -->
      <ol class="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-ink">
        <li v-for="(step, index) in steps" :key="step" class="flex items-center gap-2">
          <span class="rounded-full bg-panel px-3 py-1.5">{{ step }}</span>
          <UIcon v-if="index < steps.length - 1" name="i-lucide-arrow-right" class="size-4 text-[#999]" />
        </li>
      </ol>
    </div>

    <!-- Une carte par prestation ; l'id sert de lien depuis le sous-menu de l'en-tête -->
    <ul class="grid gap-6 sm:grid-cols-2">
      <li v-for="service in services" :id="service.id" :key="service.id" class="scroll-mt-32 flex flex-col rounded-2xl bg-panel p-6 lg:p-8">
        <span class="flex size-12 items-center justify-center rounded-full bg-white">
          <UIcon :name="service.icon" class="size-6 text-leaf" />
        </span>
        <h2 class="mt-4 text-xl font-bold text-[#222]">{{ service.title }}</h2>
        <p class="mt-2 flex-1 leading-relaxed text-[#555]">{{ service.text }}</p>
        <NuxtLink v-if="isBilan(service.id)" :to="`#analyses-${service.id}`" class="mt-3 w-fit text-sm font-semibold text-link hover:underline">
          Voir les {{ bilanDetails.analyses.length }} analyses du bilan
        </NuxtLink>
        <NuxtLink v-else-if="service.id === detox.id" :to="`#details-${detox.id}`" class="mt-3 w-fit text-sm font-semibold text-link hover:underline">
          En savoir plus sur la séance
        </NuxtLink>
        <NuxtLink
          :to="booking(service.title)"
          target="_blank"
          class="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          Prendre rendez-vous
        </NuxtLink>
      </li>
    </ul>

    <!-- Les différents bilans : Quantum et Bioplasme -->
    <section aria-labelledby="bilans-title" class="mt-12 lg:mt-16">
      <h2 id="bilans-title" class="text-center text-2xl font-bold text-[#222] lg:text-3xl">Les différents bilans</h2>

      <div
        v-for="bilan in bilans"
        :id="`analyses-${bilan.id}`"
        :key="bilan.id"
        class="mt-8 scroll-mt-32 rounded-2xl border border-ink/10 bg-white p-6 lg:p-10"
      >
        <h3 class="flex items-center gap-3 text-xl font-bold text-ink">
          <UIcon :name="bilan.icon" class="size-6 text-leaf" />
          Le {{ bilan.label }}
        </h3>
        <div class="mt-4 max-w-3xl space-y-3 leading-relaxed text-[#444]">
          <p v-for="paragraph in bilanDetails.intro" :key="paragraph">{{ paragraph }}</p>
        </div>

        <!-- 1 colonne sur mobile, 2 sur tablette, 3 sur ordinateur -->
        <ol class="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(analysis, index) in bilanDetails.analyses" :key="analysis" class="flex items-baseline gap-3 text-[#333]">
            <span class="w-6 shrink-0 text-right text-sm font-bold tabular-nums text-leaf">{{ String(index + 1).padStart(2, '0') }}</span>
            {{ analysis }}
          </li>
        </ol>

        <NuxtLink
          :to="booking(bilan.title)"
          target="_blank"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          Prendre rendez-vous pour un bilan
        </NuxtLink>
      </div>
    </section>

    <!-- Nos thérapies : détail de la détoxification ionique -->
    <section aria-labelledby="therapies-title" class="mt-12 lg:mt-16">
      <h2 id="therapies-title" class="text-center text-2xl font-bold text-[#222] lg:text-3xl">Nos thérapies</h2>

      <div :id="`details-${detox.id}`" class="mt-8 scroll-mt-32 rounded-2xl border border-ink/10 bg-white p-6 lg:p-10">
        <h3 class="flex items-center gap-3 text-xl font-bold text-ink">
          <UIcon :name="detox.icon" class="size-6 text-leaf" />
          {{ detox.title }}
        </h3>
        <p class="mt-4 text-lg font-semibold text-[#222]">{{ detoxDetails.tagline }}</p>
        <p class="mt-2 max-w-3xl leading-relaxed text-[#444]">{{ detoxDetails.text }}</p>

        <h4 class="mt-6 flex items-center gap-2 font-bold text-[#222]">
          <UIcon name="i-lucide-leaf" class="size-5 text-leaf" />
          Pourquoi choisir cette séance ?
        </h4>
        <ul class="mt-3 grid gap-2.5 sm:grid-cols-2">
          <li v-for="benefit in detoxDetails.benefits" :key="benefit" class="flex items-start gap-2 text-[#333]">
            <UIcon name="i-lucide-check" class="mt-0.5 size-5 shrink-0 text-leaf" />
            {{ benefit }}
          </li>
        </ul>

        <!-- Photos (visages floutés) et schémas de réflexologie : 2 colonnes sur mobile et tablette, 4 sur ordinateur -->
        <ul class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <li v-for="image in detoxDetails.images" :key="image.src" class="aspect-4/5 overflow-hidden rounded-xl bg-panel">
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              sizes="50vw lg:320px"
              format="webp"
              loading="lazy"
              class="size-full"
              :class="[image.fit === 'contain' ? 'object-contain p-2' : 'object-cover', 'position' in image && image.position === 'bottom' && 'object-bottom']"
            />
          </li>
        </ul>

        <NuxtLink
          :to="booking(detox.title)"
          target="_blank"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          Réserver une séance
        </NuxtLink>
      </div>
    </section>

    <!-- Kits d'adhésion : pour devenir distributeur -->
    <NuxtLink
      to="/c/kits-adhesion"
      class="mt-6 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-white transition-colors duration-150 hover:bg-ink/90 sm:flex-row sm:items-center sm:justify-between lg:p-8"
    >
      <span>
        <span class="block text-xl font-bold">Devenez distributeur VESTIGE</span>
        <span class="mt-1 block text-white/85">Démarrez avec un kit d'adhésion, dès 25 000 FCFA.</span>
      </span>
      <span class="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-ink">
        Voir les kits d'adhésion
        <UIcon name="i-lucide-arrow-right" class="size-4" />
      </span>
    </NuxtLink>

    <NuxtLink
      :to="contact.mapUrl"
      target="_blank"
      class="mx-auto mt-10 flex w-fit items-center gap-2 text-[#444] hover:underline"
    >
      <UIcon name="i-lucide-map-pin" class="size-5 text-leaf" />
      {{ contact.place }}, Douala
    </NuxtLink>
  </div>
</template>
