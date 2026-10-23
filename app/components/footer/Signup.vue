<script setup lang="ts">
withDefaults(defineProps<{ title?: string; cta?: string; to?: string }>(), {
  title: 'Inscrivez-vous et recevez nos offres santé en avant-première',
  cta: 'S\'inscrire',
  to: '/inscription',
})
</script>

<template>
  <div class="max-w-md border-2 border-ink bg-[#e8e0d5] p-5 text-ink lg:p-6">
    <p class="text-xl font-bold leading-snug lg:text-2xl">{{ title }}</p>
    <NuxtLink
      :to="to"
      class="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-bold uppercase text-white transition-colors duration-150 hover:bg-ink/90"
    >
      {{ cta }}
    </NuxtLink>
  </div>
</template>
