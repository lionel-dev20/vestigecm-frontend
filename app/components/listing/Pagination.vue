<script setup lang="ts">
const props = defineProps<{ page: number; pageCount: number }>()
const route = useRoute()

// 1 … 4 5 [6] 7 8 … 12 : première, dernière et voisines de la page courante
const pages = computed(() => {
  const list: (number | '…')[] = []
  for (let n = 1; n <= props.pageCount; n++) {
    if (n === 1 || n === props.pageCount || Math.abs(n - props.page) <= 2) list.push(n)
    else if (list.at(-1) !== '…') list.push('…')
  }
  return list
})

// Vrais liens (SEO, ouverture dans un nouvel onglet) ; la page 1 n'a pas de ?page=
// aria-current explicite : NuxtLink ignore la query et marquerait tous les liens comme « page actuelle »
const linkTo = (n: number) => ({ query: { ...route.query, page: n > 1 ? String(n) : undefined } })
</script>

<template>
  <nav v-if="pageCount > 1" aria-label="Pagination" class="flex items-center justify-center gap-1">
    <NuxtLink
      v-if="page > 1"
      :to="linkTo(page - 1)"
      aria-label="Page précédente"
      aria-current="false"
      class="flex size-11 items-center justify-center rounded-full hover:bg-panel"
    >
      <UIcon name="i-lucide-chevron-left" class="size-5" />
    </NuxtLink>

    <template v-for="(n, index) in pages" :key="index">
      <span v-if="n === '…'" class="px-2 text-[#999]">…</span>
      <NuxtLink
        v-else
        :to="linkTo(n)"
        :aria-current="n === page ? 'page' : 'false'"
        class="flex size-11 items-center justify-center rounded-full font-semibold"
        :class="n === page ? 'bg-ink text-white' : 'text-[#222] hover:bg-panel'"
      >
        {{ n }}
      </NuxtLink>
    </template>

    <NuxtLink
      v-if="page < pageCount"
      :to="linkTo(page + 1)"
      aria-label="Page suivante"
      aria-current="false"
      class="flex size-11 items-center justify-center rounded-full hover:bg-panel"
    >
      <UIcon name="i-lucide-chevron-right" class="size-5" />
    </NuxtLink>
  </nav>
</template>
