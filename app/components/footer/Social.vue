<script setup lang="ts">
const { whatsappUrl } = useRuntimeConfig().public

// WhatsApp : même lien de groupe que la bannière de contact
const links = computed(() => [
  ...socialLinks,
  { label: 'WhatsApp', to: whatsappUrl, icon: 'i-simple-icons-whatsapp' },
])
</script>

<template>
  <div>
    <p class="text-lg font-bold">Suivez-nous</p>
    <ul class="mt-3 flex flex-wrap gap-2.5">
      <li v-for="link in links" :key="link.label">
        <NuxtLink
          :to="link.to"
          target="_blank"
          :aria-label="link.label"
          class="flex size-11 items-center justify-center rounded-full bg-white text-ink transition-colors duration-150 hover:bg-white/85"
        >
          <UIcon :name="link.icon!" class="size-5" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
