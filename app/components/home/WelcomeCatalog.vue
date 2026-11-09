<script setup lang="ts">
// Bloc « Bienvenue » : accès direct au catalogue complet et aux principales catégories
// Photo : visuel « Kit Bien-être » du document VESTIGE « Nos kits de traitement » (bandeau retiré)
const shortcuts = [
  { label: 'Produits ayurvédiques', to: '/c/produits-ayurvediques' },
  { label: 'Kits traitement', to: '/c/kits-traitement' },
  { label: 'Soins du visage et du corps', to: '/c/soins-visage-corps' },
  { label: 'Minceur', to: '/c/minceur' },
  { label: 'Bilans et thérapies', to: '/bilans-therapies' },
  { label: 'Agriculture', to: '/c/agriculture' },
]
</script>

<template>
  <section aria-labelledby="welcome-title" class="mx-auto max-w-350 px-4 py-4 lg:px-8">
    <!-- Bureau : texte à gauche, photo à droite · Mobile : photo sous le texte -->
    <div class="grid overflow-hidden rounded-2xl lg:grid-cols-[11fr_9fr]">
      <!-- Fond lavande sur la partie texte uniquement -->
      <div class="flex flex-col justify-center bg-lavender px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
        <p class="text-sm font-bold uppercase tracking-[0.15em] text-leaf">Médecine naturelle indienne</p>
        <h2 id="welcome-title" class="mt-3 text-3xl font-bold leading-tight text-[#222] lg:text-4xl">
          Bienvenue chez VESTIGE Cameroun
        </h2>
        <p class="mt-4 max-w-xl text-lg leading-relaxed text-[#444]">
          <strong class="text-[#222]">Plus de panique. Plus besoin de voyager en Inde.</strong>
          La médecine naturelle indienne (Ayurvéda) est désormais chez vous, grâce à la thérapie nutritionnelle cellulaire.
        </p>

        <NuxtLink
          to="/c/produits"
          class="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-bold text-white transition-colors duration-150 hover:bg-ink/90"
        >
          Voir le catalogue complet
          <UIcon name="i-lucide-arrow-right" class="size-5" />
        </NuxtLink>

        <!-- Raccourcis vers les catégories -->
        <ul class="mt-6 flex flex-wrap gap-2" aria-label="Catégories">
          <li v-for="shortcut in shortcuts" :key="shortcut.to">
            <NuxtLink
              :to="shortcut.to"
              class="block rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-medium text-[#333] transition-colors duration-150 hover:border-ink/40"
            >
              {{ shortcut.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <NuxtImg
        src="/images/banners/bien-etre-vestige.jpg"
        alt="Un homme et une femme souriants au bord de la mer, avec les produits VESTIGE Noni, Flax Oil, Ganoderma et Calcium"
        width="1400"
        height="1030"
        sizes="100vw lg:600px"
        format="webp"
        loading="lazy"
        class="aspect-video size-full object-cover object-[70%_center] lg:aspect-auto"
      />
    </div>
  </section>
</template>
