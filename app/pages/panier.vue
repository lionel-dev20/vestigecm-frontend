<script setup lang="ts">
const { items, count } = useCart()

// Suggestions : chargées à l'approche du scroll
const { data: suggestions, status, execute } = useDeals()

// Page personnelle : pas d'indexation
useSeoMeta({ title: 'Mon panier', robots: 'noindex, follow' })
</script>

<template>
  <div>
    <div class="mx-auto max-w-350 px-4 py-8 lg:px-8 lg:py-10">
      <h1 class="text-center text-2xl font-bold text-[#222] lg:text-3xl">
        Mon panier
        <span v-if="count" class="font-normal text-[#666]">({{ count }})</span>
      </h1>
      <div class="mx-auto mt-3 h-1 w-14 rounded-full bg-ink" />

      <CartEmpty v-if="!items.length" />

      <!-- Bureau : articles à gauche, récapitulatif collé au scroll à droite -->
      <div v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10">
        <section aria-label="Articles du panier">
          <!-- En-têtes de colonnes : bureau uniquement -->
          <div class="hidden grid-cols-[6rem_1fr_9rem_7rem_3rem] gap-x-4 border-b border-ink/10 pb-3 text-xs uppercase tracking-wide text-[#666] md:grid">
            <span class="col-span-2">Produit</span>
            <span>Quantité</span>
            <span class="text-right">Prix</span>
            <span class="sr-only">Retirer</span>
          </div>
          <ul>
            <CartLine v-for="item in items" :key="item.id" :item="item" />
          </ul>
          <NuxtLink to="/" class="mt-6 inline-flex items-center gap-2 font-semibold text-ink hover:underline">
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            Continuer mes achats
          </NuxtLink>
        </section>

        <aside class="space-y-2 lg:sticky lg:top-28 lg:self-start">
          <CartSummary />
          <CartDiscount />
        </aside>
      </div>
    </div>

    <ProductCarouselSection
      title="Vous aimerez aussi"
      to="/c/all-offers"
      :products="suggestions"
      :loading="status !== 'success'"
      @visible="execute()"
    />
  </div>
</template>
