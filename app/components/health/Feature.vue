<script setup lang="ts">
defineProps<{ icon: string; text: string }>()
</script>

<template>
  <li class="flex items-center gap-4 rounded-xl bg-white p-5 text-[#222] lg:p-6">
    <UIcon :name="icon" class="size-8 shrink-0 text-navy" />
    <p class="leading-snug lg:text-lg">{{ text }}</p>
  </li>
</template>
