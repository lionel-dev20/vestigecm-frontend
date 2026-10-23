<script setup lang="ts">
// Monte le contenu (et donc ses requêtes) seulement à l'approche de l'écran
const props = withDefaults(defineProps<{ rootMargin?: string }>(), { rootMargin: '300px' })

const el = useTemplateRef<HTMLElement>('el')
const visible = useInView(el, props.rootMargin)
</script>

<template>
  <div ref="el">
    <slot v-if="visible" />
    <!-- Rendu côté serveur : réserve la place pendant le scroll -->
    <slot v-else name="fallback" />
  </div>
</template>
