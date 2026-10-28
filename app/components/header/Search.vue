<script setup lang="ts">
import type { Product } from '#shared/types/product'

const route = useRoute()
const listId = useId()
const root = useTemplateRef<HTMLElement>('root')

const query = ref('')
const results = ref<Product[]>([])
const loading = ref(false)
const open = ref(false)
// Option surlignée au clavier ; la dernière (index = results.length) est « Voir tous les résultats »
const active = ref(-1)

const term = computed(() => query.value.trim())
const showPanel = computed(() => open.value && term.value.length >= 2)

// Sur la page de résultats, la barre affiche la recherche en cours
watch(() => route.query.q, (q) => {
  if (route.path === '/recherche') query.value = String(q ?? '')
}, { immediate: true })

// Ferme les suggestions après chaque navigation
watch(() => route.fullPath, () => {
  open.value = false
  active.value = -1
})

// Suggestions : 250 ms après la dernière frappe, la requête précédente est annulée
let timer: ReturnType<typeof setTimeout> | undefined
let controller: AbortController | undefined

function onInput() {
  clearTimeout(timer)
  active.value = -1
  open.value = true
  if (term.value.length < 2) {
    results.value = []
    loading.value = false
    return
  }
  loading.value = true
  timer = setTimeout(suggest, 250)
}

async function suggest() {
  controller?.abort()
  controller = new AbortController()
  const { signal } = controller
  try {
    results.value = await $fetch<Product[]>('/api/search', { query: { q: term.value, limit: 6 }, signal })
  }
  catch {
    if (!signal.aborted) results.value = []
  }
  finally {
    if (!signal.aborted) loading.value = false
  }
}

function submit() {
  if (!term.value) return
  open.value = false
  navigateTo({ path: '/recherche', query: { q: term.value } })
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (!showPanel.value || loading.value || !results.value.length) return

  const last = results.value.length
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    active.value = active.value >= last ? 0 : active.value + 1
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    active.value = active.value <= 0 ? last : active.value - 1
  }
  else if (event.key === 'Enter' && active.value >= 0 && active.value < last) {
    event.preventDefault()
    navigateTo(results.value[active.value]!.to)
  }
}

// Ferme quand le focus quitte la barre et ses suggestions
function onFocusout(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) open.value = false
}

onBeforeUnmount(() => {
  clearTimeout(timer)
  controller?.abort()
})
</script>

<template>
  <form ref="root" role="search" class="relative" @submit.prevent="submit" @focusout="onFocusout">
    <UIcon
      name="i-lucide-search"
      class="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-accent"
    />
    <input
      v-model="query"
      type="search"
      role="combobox"
      placeholder="Rechercher un produit, un soin…"
      aria-label="Rechercher"
      autocomplete="off"
      :aria-expanded="showPanel"
      :aria-controls="listId"
      :aria-activedescendant="active >= 0 ? `${listId}-${active}` : undefined"
      class="h-12 w-full rounded-full bg-field pl-13 pr-5 text-base text-ink placeholder:text-ink/70 outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
      @input="onInput"
      @focus="open = true"
      @keydown="onKeydown"
    >

    <!-- Suggestions -->
    <div
      v-show="showPanel"
      class="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <p v-if="loading" class="flex items-center gap-2 px-4 py-4 text-sm text-[#666]">
        <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin" />
        Recherche…
      </p>

      <p v-else-if="!results.length" class="px-4 py-4 text-sm text-[#555]">
        Aucun produit pour « <strong>{{ term }}</strong> »
      </p>

      <ul v-else :id="listId" role="listbox" aria-label="Suggestions">
        <li v-for="(product, index) in results" :id="`${listId}-${index}`" :key="product.id" role="option" :aria-selected="active === index">
          <NuxtLink
            :to="product.to"
            tabindex="-1"
            class="flex items-center gap-3 px-4 py-2.5"
            :class="active === index ? 'bg-panel' : 'hover:bg-panel'"
          >
            <span class="size-12 shrink-0 rounded-lg bg-[#f3f3f3] p-1">
              <NuxtImg :src="product.image" alt="" width="48" height="48" densities="x1 x2" format="webp" class="size-full object-contain mix-blend-multiply" />
            </span>
            <span class="line-clamp-2 min-w-0 flex-1 text-sm text-[#222]">{{ product.name }}</span>
            <ProductPrice :price="product.price" :old-price="product.oldPrice" class="shrink-0 text-right [&_span]:text-sm" />
          </NuxtLink>
        </li>
      </ul>

      <button
        v-if="!loading && results.length"
        :id="`${listId}-${results.length}`"
        type="submit"
        class="flex w-full cursor-pointer items-center justify-between border-t border-ink/10 px-4 py-3 text-sm font-semibold text-ink"
        :class="active === results.length ? 'bg-panel' : 'hover:bg-panel'"
      >
        Voir tous les résultats pour « {{ term }} »
        <UIcon name="i-lucide-arrow-right" class="size-4" />
      </button>
    </div>
  </form>
</template>
