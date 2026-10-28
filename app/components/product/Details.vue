<script setup lang="ts">
import type { ProductDetail } from '#shared/types/product'

defineProps<{ sections: ProductDetail['details'] }>()
</script>

<template>
  <!-- <details> natif : dépliable sans JavaScript, contenu présent pour le SEO -->
  <div class="divide-y divide-ink/10 border-y border-ink/10">
    <details v-for="(section, index) in sections" :key="section.title" :open="index === 0" class="group">
      <summary class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold text-[#222]">
        {{ section.title }}
        <UIcon name="i-lucide-chevron-down" class="size-5 transition-transform duration-150 group-open:rotate-180" />
      </summary>
      <ul v-if="Array.isArray(section.content)" class="mb-5 list-disc space-y-1.5 pl-5 text-[#444]">
        <li v-for="line in section.content" :key="line">{{ line }}</li>
      </ul>
      <p v-else class="mb-5 leading-relaxed text-[#444]">{{ section.content }}</p>
    </details>
  </div>
</template>
