<script setup lang="ts">
// Textes gérés dans WordPress (ACF) ; lien identique à l'icône WhatsApp du footer (utils/contact.ts)
withDefaults(defineProps<{ title?: string; label?: string }>(), {
  title: 'Besoin d\'un conseil personnalisé ?',
  label: 'Rejoindre notre WhatsApp',
})
</script>

<template>
  <section class="mx-auto max-w-350 px-4 py-4 lg:px-8">
    <div class="flex flex-col gap-4 rounded-xl bg-panel px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p class="text-lg font-medium text-[#333]">{{ title }}</p>

      <!-- Lien externe : NuxtLink ajoute rel="noopener noreferrer" -->
      <NuxtLink
        :to="whatsappLink(contact.whatsappMessage)"
        target="_blank"
        class="flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-lg font-bold text-white transition-colors duration-150 hover:bg-cta/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      >
        <UIcon name="i-simple-icons-whatsapp" class="size-5" />
        {{ label }}
      </NuxtLink>
    </div>
  </section>
</template>
