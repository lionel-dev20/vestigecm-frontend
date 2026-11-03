<script setup lang="ts">
useSeoMeta({
  title: 'Témoignages',
  description: 'Ils ont adopté les produits naturels VESTIGE : partagez votre expérience avec nous.',
})

// Message pré-rempli pour envoyer son témoignage
const whatsapp = `https://wa.me/237699288607?text=${encodeURIComponent('Bonjour, je souhaite partager mon témoignage sur les produits VESTIGE.')}`
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Témoignages' }]" />

    <div class="mx-auto max-w-2xl py-10 text-center lg:py-16">
      <h1 class="text-2xl font-bold text-[#222] lg:text-4xl">Témoignages</h1>
      <p class="mt-4 text-lg leading-relaxed text-[#555]">
        Vous avez suivi un kit ou utilisé nos produits ? Votre expérience peut aider d'autres personnes à prendre soin de leur santé.
      </p>

      <div class="mt-8 rounded-2xl bg-panel p-8">
        <UIcon name="i-lucide-message-square-quote" class="size-12 text-[#999]" />
        <p class="mt-3 font-semibold text-[#222]">Les premiers témoignages arrivent bientôt</p>
        <p class="mt-1 text-[#666]">Envoyez-nous le vôtre par WhatsApp : texte, photo ou vidéo.</p>
        <NuxtLink
          :to="whatsapp"
          target="_blank"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-5" />
          Partager mon témoignage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
