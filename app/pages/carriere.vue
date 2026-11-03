<script setup lang="ts">
useSeoMeta({
  title: 'Carrière',
  description: 'Rejoignez VESTIGE Cameroun comme distributeur : formation, accompagnement et produits naturels de qualité.',
})

const whatsapp = `https://wa.me/237699288607?text=${encodeURIComponent('Bonjour, je souhaite devenir distributeur VESTIGE.')}`

const steps = [
  { icon: 'i-lucide-message-circle', title: 'Prenez contact', text: 'Échangez avec notre équipe à Douala sur WhatsApp.' },
  { icon: 'i-lucide-graduation-cap', title: 'Formez-vous', text: 'Découvrez les produits, les kits et les conseils d\'utilisation.' },
  { icon: 'i-lucide-handshake', title: 'Accompagnez vos clients', text: 'Partagez les produits VESTIGE autour de vous, avec notre soutien.' },
]
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Carrière' }]" />

    <div class="mx-auto max-w-3xl py-10 lg:py-16">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-[#222] lg:text-4xl">Devenez distributeur VESTIGE</h1>
        <p class="mt-4 text-lg leading-relaxed text-[#555]">
          Vous souhaitez développer une activité autour de la santé naturelle ? Rejoignez le réseau VESTIGE Cameroun.
        </p>
      </div>

      <ol class="mt-10 grid gap-4 sm:grid-cols-3">
        <li v-for="step in steps" :key="step.title" class="rounded-2xl bg-panel p-6">
          <UIcon :name="step.icon" class="size-8 text-leaf" />
          <h2 class="mt-3 font-bold text-[#222]">{{ step.title }}</h2>
          <p class="mt-1 text-[#555]">{{ step.text }}</p>
        </li>
      </ol>

      <div class="mt-10 text-center">
        <NuxtLink
          :to="whatsapp"
          target="_blank"
          class="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          Nous contacter
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
