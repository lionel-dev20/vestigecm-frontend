<script setup lang="ts">
import type { ShowcaseItem } from '#shared/types/showcase'

defineProps<{ items: ShowcaseItem[]; loading?: boolean }>()
</script>

<template>
  <!-- Mobile : carrousel horizontal · Tablette et plus : 3 colonnes -->
  <ul
    :aria-busy="loading"
    class="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0"
  >
    <template v-if="loading">
      <li v-for="n in 3" :key="n" class="w-3/4 shrink-0 snap-start sm:w-auto">
        <QualityCardSkeleton />
      </li>
    </template>
    <li v-for="item in items" v-else :key="item.to" class="w-3/4 shrink-0 snap-start sm:w-auto">
      <QualityCard v-bind="item" />
    </li>
  </ul>
</template>
