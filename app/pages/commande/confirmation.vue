<script setup lang="ts">
const route = useRoute()
const number = computed(() => String(route.query.numero ?? ''))

// Accès direct sans numéro de commande : retour à l'accueil
if (!number.value) await navigateTo('/', { replace: true })

useSeoMeta({ title: 'Commande confirmée', robots: 'noindex, nofollow' })

const steps = [
  { icon: 'i-lucide-phone', text: 'Nous vous appelons pour confirmer la commande et l\'adresse.' },
  { icon: 'i-lucide-truck', text: 'Votre colis est livré dans votre quartier.' },
  { icon: 'i-lucide-banknote', text: 'Vous payez à la réception, en espèces ou par Mobile Money.' },
]
</script>

<template>
  <div class="mx-auto max-w-xl px-4 py-12 text-center lg:py-16">
    <div class="mx-auto flex size-16 items-center justify-center rounded-full bg-leaf/10">
      <UIcon name="i-lucide-check" class="size-8 text-leaf" />
    </div>
    <h1 class="mt-5 text-2xl font-bold text-[#222] lg:text-3xl">Merci, votre commande est enregistrée</h1>
    <p class="mt-2 text-[#555]">Commande n° <strong class="text-[#222]">{{ number }}</strong></p>

    <ol class="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-white p-5 text-left">
      <li v-for="(step, index) in steps" :key="step.icon" class="flex items-start gap-3">
        <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-panel font-bold text-ink">{{ index + 1 }}</span>
        <p class="pt-1 text-[#333]">{{ step.text }}</p>
      </li>
    </ol>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <NuxtLink to="/" class="rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-ink/90">Continuer mes achats</NuxtLink>
      <NuxtLink to="https://wa.me/237699288607" target="_blank" class="flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink hover:bg-panel">
        <UIcon name="i-simple-icons-whatsapp" class="size-5" />
        Une question ?
      </NuxtLink>
    </div>
  </div>
</template>
