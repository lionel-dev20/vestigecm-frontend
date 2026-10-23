---
name: nuxt4-frontend
description: Règles frontend pour ce projet Nuxt 4 (Vue 3.5, Nuxt UI 4, Tailwind 4) — SSR propre, nuxt.config moderne, composants réutilisables, code simple. À utiliser pour créer ou modifier une page, un composant, un composable, un layout, la config Nuxt, ou pour corriger une erreur d'hydratation.
---

# Nuxt 4 — Frontend simple et SSR-safe

Objectif : un code court, lisible, réutilisable. Pas de spaghetti, pas d'effets visuels non demandés.

## 1. Structure (Nuxt 4, dossier `app/`)

```
app/
  app.vue            # <UApp><NuxtLayout><NuxtPage/></NuxtLayout></UApp>
  pages/             # routes, fines : assemblent des composants
  layouts/           # default.vue, etc.
  components/
    base/            # briques UI génériques (BaseCard, BaseSection…)
    <domaine>/       # composants métier (ProductCard, ProductList…)
  composables/       # logique réutilisable (useProducts…)
  utils/             # fonctions pures, auto-importées
  assets/css/main.css
server/api/          # endpoints Nitro
shared/              # types/utils partagés app + server
```

- Une page = assemblage. La logique va dans un composable, l'UI dans un composant.
- Un fichier > ~150 lignes → le découper.
- Ne jamais importer manuellement ce qui est auto-importé (`ref`, `computed`, `useFetch`, composants…).

## 2. nuxt.config.ts — base recommandée

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  // Rendu par route : le bon mode au bon endroit
  routeRules: {
    '/': { prerender: true },
    '/blog/**': { swr: 3600 },        // cache + revalidation
    '/admin/**': { ssr: false },       // espace privé : SPA
    '/api/**': { cors: true },
  },

  // Secrets côté serveur, valeurs publiques dans `public`
  runtimeConfig: {
    apiSecret: '',                     // NUXT_API_SECRET
    public: { apiBase: '/api' },       // NUXT_PUBLIC_API_BASE
  },

  app: {
    head: { htmlAttrs: { lang: 'fr' } },
  },

  vite: { plugins: [tailwindcss()] },
})
```

Règles :
- `ssr: true` reste le défaut global ; désactiver **par route** via `routeRules`, jamais globalement sans raison.
- Pas de valeur sensible en dur : `runtimeConfig` + variables `NUXT_*`.
- Pas d'option `experimental` sans besoin concret.

## 3. Règles SSR

**Données** — toujours `useFetch` / `useAsyncData` dans `setup`, jamais `$fetch` seul au chargement (double requête + mismatch).

```ts
const { data, status, error, refresh } = await useFetch('/api/products', {
  key: 'products',                      // clé stable = dédoublonnage + cache partagé
  query: { page },                      // réactif : refetch auto
  pick: ['id', 'name', 'price'],        // payload minimal
})
```

- `$fetch` est réservé aux actions utilisateur (submit, clic).
- En Nuxt 4, `data` est un `shallowRef` qui vaut `undefined` par défaut : utiliser `status` (`'pending' | 'success' | 'error'`) pour l'affichage.
- Données non critiques pour le SEO : `lazy: true` ou `server: false`.

**État partagé** — `useState('key', () => init)`. Jamais de `ref()` au niveau module : il serait partagé entre toutes les requêtes du serveur.

**APIs navigateur** (`window`, `localStorage`, `document`) — uniquement dans `onMounted`, ou derrière `import.meta.client`, ou dans `<ClientOnly>`.

**Hydratation** — le rendu serveur doit être identique au client :
- pas de `Date.now()`, `Math.random()`, ni de locale implicite dans le template ;
- utiliser `useId()` pour les id HTML ;
- composants lourds sous la ligne de flottaison : hydratation paresseuse.

```vue
<LazyProductReviews hydrate-on-visible />
<LazyChatWidget hydrate-on-idle />
```

**SEO** — `useSeoMeta({ title, description, ogImage })` dans chaque page.

## 4. Composants réutilisables

- Utiliser d'abord les composants Nuxt UI (`UButton`, `UCard`, `UInput`, `UModal`…) avant d'en créer.
- Props typées, émissions typées, slots pour la flexibilité. Pas de logique métier dans un composant `base/`.

```vue
<!-- components/base/BaseSection.vue -->
<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <section class="py-12">
    <h2 class="text-2xl font-semibold">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-muted">{{ subtitle }}</p>
    <div class="mt-6"><slot /></div>
  </section>
</template>
```

```ts
// composables/useProducts.ts
// Liste des produits, partagée via la clé 'products'
export function useProducts() {
  return useFetch('/api/products', { key: 'products', default: () => [] })
}
```

- Nommage : `PascalCase` pour les composants, `useXxx` pour les composables, `defineModel()` pour le `v-model`.
- Toujours `<script setup lang="ts">`.

## 5. Style visuel

- Tailwind + tokens Nuxt UI (`text-muted`, `bg-elevated`, `primary`…) ; pas de couleurs en dur répétées.
- **Aucun dégradé, ombre lourde, flou, glow ou animation décorative sans demande explicite.**
- Transitions limitées aux interactions (hover, focus, ouverture), courtes (`transition-colors`, `duration-150`).
- Mobile d'abord, accessibilité : `alt`, labels, focus visible.

## 6. Commentaires

Courts, utiles, sur le *pourquoi* — jamais une paraphrase du code.

```ts
// ✅ Clé fixe : la liste est réutilisée par le header sans 2e requête
// ❌ On récupère les produits avec useFetch
```

## Checklist avant de terminer

- [ ] Données via `useFetch`/`useAsyncData` avec `key`, aucun `$fetch` au chargement
- [ ] Aucun accès navigateur hors `onMounted` / `ClientOnly`
- [ ] Pas de `ref` global, état partagé via `useState`
- [ ] Mode de rendu défini dans `routeRules` si la route l'exige
- [ ] Page fine, logique en composable, UI en composants
- [ ] Aucun effet visuel non demandé
- [ ] `nuxt build` passe sans warning d'hydratation
