<script setup lang="ts">
defineProps<{ featured?: boolean }>()
</script>

<template>
  <div class="rounded-2xl bg-field" :class="heroCardSize(featured)" aria-hidden="true">
    <div class="grid gap-3">
      <USkeleton class="bg-ink/10" :class="featured ? 'h-10 w-2/3 lg:h-12' : 'h-6 w-3/4'" />
      <USkeleton class="bg-ink/10" :class="featured ? 'h-6 w-4/5' : 'h-4 w-2/3'" />
      <USkeleton class="bg-ink/10" :class="featured ? 'h-6 w-1/2' : 'h-4 w-1/2'" />
    </div>
  </div>
</template>
