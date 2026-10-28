<script setup lang="ts">
import type { ProductDetail } from '#shared/types/product'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: detail, error } = await useProduct(slug)

// Produit inconnu : 404 au rendu serveur, ou dès la réponse en navigation
if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable', fatal: true })
watch(error, (value) => {
  if (value?.statusCode === 404) showError({ statusCode: 404, statusMessage: 'Produit introuvable' })
})

// En attendant la fiche complète : les infos de la carte cliquée (nom, prix, photo) s'affichent tout de suite
const preview = useProductPreview()
const loading = computed(() => !detail.value)
const product = computed<ProductDetail | null>(() => {
  if (detail.value) return detail.value
  const card = preview.value
  if (card?.to !== `/p/${slug.value}`) return null
  return { ...card, brand: 'Vestige', images: [card.image], summary: '', inStock: true, category: { label: 'Boutique', to: '/' }, details: [] }
})

const quantity = ref(1)
const { add } = useCart()
const toast = useToast()

function buy() {
  if (!product.value) return
  add(product.value, quantity.value)
  toast.add({ title: 'Ajouté au panier', description: `${quantity.value} × ${product.value.name}`, icon: 'i-lucide-check', color: 'success' })
}

// Galerie : hauteur de la colonne d'achat + 6rem (bureau)
const aside = useTemplateRef<HTMLElement>('aside')
const asideHeight = useElementHeight(aside)
const galleryStyle = computed(() => (asideHeight.value ? { '--gallery-h': `calc(${asideHeight.value}px + 6rem)` } : undefined))

// Produits similaires : chargés à l'approche du scroll
const related = useRelatedProducts(slug)

useSeoMeta({
  title: () => product.value?.name,
  description: () => product.value?.summary,
  ogImage: () => product.value?.image,
})

// Données structurées : prix et avis visibles dans Google
useHead(() => ({
  script: product.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': product.value.name,
          'image': product.value.images,
          'brand': { '@type': 'Brand', 'name': product.value.brand },
          // Note transmise à Google uniquement s'il existe de vrais avis
          ...(product.value.reviews ? { aggregateRating: { '@type': 'AggregateRating', 'ratingValue': product.value.rating, 'reviewCount': product.value.reviews } } : {}),
          'offers': {
            '@type': 'Offer',
            'price': product.value.price,
            'priceCurrency': 'XAF',
            'availability': `https://schema.org/${product.value.inStock ? 'InStock' : 'OutOfStock'}`,
          },
        }),
      }]
    : [],
}))
</script>

<template>
  <div v-if="product">
    <div class="mx-auto max-w-350 px-4 py-6 lg:px-8">
      <BaseBreadcrumb
        :links="[
          { label: 'Accueil', to: '/' },
          { label: product.category.label, to: product.category.to },
          { label: product.name },
        ]"
      />

      <!-- Mobile : galerie, achat, détails · Bureau : galerie + détails à gauche, achat collé à droite -->
      <div class="mt-6 grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-x-14 lg:gap-y-10">
        <ProductGallery :images="product.images" :alt="product.name" :style="galleryStyle" class="lg:col-start-1" />

        <!-- top-28 : sous la barre du header, elle aussi collée -->
        <aside ref="aside" class="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <ProductBuyBox v-model:quantity="quantity" :product="product" :loading="loading" @buy="buy" />
        </aside>

        <ProductDetails v-if="product.details.length" :sections="product.details" class="lg:col-start-1" />
      </div>
    </div>

    <ProductCarouselSection
      title="Vous aimerez aussi"
      :to="product.category.to"
      :products="related.data.value"
      :loading="related.status.value !== 'success'"
      @visible="related.execute()"
    />

    <!-- En fin de page pour rester collée sur toute la hauteur -->
    <ProductMobileBuyBar v-model:quantity="quantity" :price="product.price" :in-stock="product.inStock" :loading="loading" @buy="buy" />
  </div>
</template>
