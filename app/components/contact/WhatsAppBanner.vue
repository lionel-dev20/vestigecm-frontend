<script setup lang="ts">
const props = withDefaults(defineProps<{ title?: string; label?: string; to?: string }>(), {
  title: 'Besoin d\'un conseil personnalisé ?',
  label: 'Rejoindre sur WhatsApp',
})

// Lien géré dans WordPress (ACF) ; à défaut, NUXT_PUBLIC_WHATSAPP_URL
const whatsappUrl = computed(() => props.to || useRuntimeConfig().public.whatsappUrl)
</script>

<template>
  <section class="mx-auto max-w-350 px-4 py-4 lg:px-8">
    <div class="flex flex-col gap-4 rounded-xl bg-panel px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p class="text-lg font-medium text-[#333]">{{ title }}</p>

      <!-- Lien externe : NuxtLink ajoute rel="noopener noreferrer" -->
      <NuxtLink
        :to="whatsappUrl"
        target="_blank"
        class="flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-lg font-bold text-white transition-colors duration-150 hover:bg-cta/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      >
        <UIcon name="i-simple-icons-whatsapp" class="size-5" />
        {{ label }}
      </NuxtLink>
    </div>
  </section>
</template>
