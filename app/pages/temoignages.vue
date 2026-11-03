<script setup lang="ts">
useSeoMeta({
  title: 'Témoignages',
  description: 'Ils utilisent les produits naturels VESTIGE : découvrez leurs témoignages en vidéo.',
})

// Filtre par sujet (Diabète, Arthrite…) ; « Tous » par défaut
const topic = ref<string>()
const list = computed(() => (topic.value ? testimonials.filter(t => t.topic === topic.value) : testimonials))

// Message pré-rempli pour envoyer son témoignage
const whatsapp = `https://wa.me/237699288607?text=${encodeURIComponent('Bonjour, je souhaite partager mon témoignage sur les produits VESTIGE.')}`
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-8">
    <BaseBreadcrumb :links="[{ label: 'Accueil', to: '/' }, { label: 'Témoignages' }]" />

    <!-- Bannière : le titre « NOS Témoignages » est dans l'image -->
    <h1 class="sr-only">Nos témoignages</h1>
    <NuxtImg
      src="/images/temoignages/banniere.jpg"
      alt="VESTIGE – Nos témoignages"
      width="1080"
      height="607"
      sizes="100vw lg:1024px"
      format="webp"
      preload
      fetchpriority="high"
      class="mx-auto mt-4 w-full max-w-5xl rounded-2xl"
    />

    <p class="mx-auto mt-6 max-w-2xl text-center text-lg text-[#555]">
      Suivez les témoignages des personnes qui utilisent déjà nos produits.
    </p>

    <!-- Filtres : défilent horizontalement sur mobile -->
    <div class="scrollbar-none -mx-4 mt-6 overflow-x-auto px-4">
      <ul class="flex w-max gap-2" aria-label="Sujets">
        <li v-for="item in [undefined, ...testimonialTopics]" :key="item ?? 'tous'">
          <button
            type="button"
            :aria-pressed="topic === item"
            class="cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150"
            :class="topic === item ? 'border-ink bg-ink text-white' : 'border-ink/20 text-[#222] hover:bg-panel'"
            @click="topic = item"
          >
            {{ item ?? 'Tous' }}
          </button>
        </li>
      </ul>
    </div>

    <!-- 1 carte sur mobile, 2 sur tablette, 4 sur ordinateur -->
    <ul class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="item in list" :key="item.id">
        <TestimonialCard v-bind="item" />
      </li>
    </ul>

    <div class="mx-auto mt-12 max-w-xl rounded-2xl bg-panel p-8 text-center">
      <p class="font-semibold text-[#222]">Vous aussi, partagez votre expérience</p>
      <p class="mt-1 text-[#666]">Envoyez-nous votre témoignage par WhatsApp : texte, photo ou vidéo.</p>
      <NuxtLink
        :to="whatsapp"
        target="_blank"
        class="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90"
      >
        <UIcon name="i-simple-icons-whatsapp" class="size-5" />
        Partager mon témoignage
      </NuxtLink>
    </div>
  </div>
</template>
