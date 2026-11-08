<script setup lang="ts">
useSeoMeta({
  title: 'Bilans et thérapies',
  description: 'Bilan Quantum, Bilan Bioplasme, Thérapie Térahertz et Détoxification ionique chez VESTIGE Cameroun, à Douala Logbaba.',
})

// Rendez-vous par WhatsApp, avec la prestation choisie dans le message
const booking = (title: string) => whatsappLink(`Bonjour, je souhaite prendre rendez-vous pour : ${title}.`)
const steps = ['Évaluer', 'Comprendre', 'Personnaliser', 'Accompagner']
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
