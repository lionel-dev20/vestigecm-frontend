<script setup lang="ts">
import type { Review, ReviewErrors, ReviewForm } from '#shared/utils/review'

const props = defineProps<{ slug: string; rating: number; count: number }>()

// Avis publiés : chargés à l'approche du scroll
const { data: reviews, status, execute } = useLazyFetch<Review[]>(() => `/api/reviews/${props.slug}`, {
  key: () => `reviews-${props.slug}`,
  immediate: false,
  server: false,
  default: () => [],
})
const section = useTemplateRef<HTMLElement>('section')
const inView = useInView(section)
watch(inView, () => execute(), { once: true })

// Formulaire ouvert à tous, sans compte
const form = reactive<ReviewForm>({ rating: 0, name: '', email: '', comment: '' })
const website = ref('') // champ piège invisible : rempli uniquement par les robots
const errors = ref<ReviewErrors>({})
const pending = ref(false)
const sent = ref(false)
const failure = ref('')

// Une fois signalée, une erreur disparaît dès que le champ est corrigé
watch(form, () => {
  const current = validateReview(form)
  for (const field of Object.keys(errors.value) as (keyof ReviewForm)[]) {
    errors.value[field] = current[field]
  }
})

async function submit() {
  errors.value = validateReview(form)
  if (Object.values(errors.value).some(Boolean)) return

  pending.value = true
  failure.value = ''
  try {
    await $fetch(`/api/reviews/${props.slug}`, { method: 'POST', body: { ...form, website: website.value } })
    sent.value = true
  }
  catch (error) {
    const data = (error as { data?: { statusMessage?: string; data?: { errors?: ReviewErrors } } }).data
    if (data?.data?.errors) errors.value = data.data.errors
    else failure.value = data?.statusMessage ?? 'Envoi impossible pour le moment, réessayez plus tard.'
  }
  finally {
    pending.value = false
  }
}

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })
</script>

<template>
  <section id="avis" ref="section" aria-labelledby="reviews-title" class="scroll-mt-28">
    <h2 id="reviews-title" class="text-xl font-bold text-[#222] lg:text-2xl">Avis clients</h2>

    <!-- Résumé : note moyenne et nombre d'avis -->
    <div class="mt-4 flex items-center gap-4">
      <p v-if="count" class="text-4xl font-bold text-[#222]">{{ rating.toLocaleString('fr-FR', { maximumFractionDigits: 1 }) }}</p>
      <div>
        <ProductRating :value="rating" :count="0" />
        <p class="mt-1 text-sm text-[#555]">{{ count ? `${count} avis` : 'Aucun avis pour le moment. Soyez le premier à donner le vôtre !' }}</p>
      </div>
    </div>

    <!-- Liste des avis publiés -->
    <div v-if="status === 'pending' || status === 'idle'" class="mt-6 space-y-4" aria-hidden="true">
      <USkeleton v-for="n in Math.min(count, 2)" :key="n" class="h-24 w-full rounded-xl" />
    </div>
    <ul v-else-if="reviews.length" class="mt-6 divide-y divide-ink/10 border-y border-ink/10">
      <li v-for="review in reviews" :key="review.id" class="py-5">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <ProductRating :value="review.rating" :count="0" />
          <p class="font-semibold text-[#222]">{{ review.name }}</p>
          <span v-if="review.verified" class="flex items-center gap-1 text-xs font-medium text-leaf">
            <UIcon name="i-lucide-badge-check" class="size-4" />
            Achat vérifié
          </span>
        </div>
        <p class="mt-1 text-xs text-[#888]">{{ dateFormat.format(new Date(review.date)) }}</p>
        <!-- Texte brut : aucun HTML d'un avis n'est interprété -->
        <p class="mt-2 whitespace-pre-line leading-relaxed text-[#333]">{{ review.comment }}</p>
      </li>
    </ul>

    <!-- Formulaire : connecté ou non -->
    <div class="mt-8 rounded-2xl border border-ink/10 bg-white p-5 lg:p-6">
      <div v-if="sent" role="status" class="flex items-start gap-3">
        <UIcon name="i-lucide-circle-check" class="mt-0.5 size-6 shrink-0 text-leaf" />
        <div>
          <p class="font-semibold text-[#222]">Merci pour votre avis !</p>
          <p class="mt-1 text-sm text-[#555]">Il sera publié après vérification par notre équipe.</p>
        </div>
      </div>

      <form v-else novalidate class="space-y-5" @submit.prevent="submit">
        <h3 class="text-lg font-bold text-[#222]">Donner mon avis</h3>

        <ProductRatingInput v-model="form.rating" :error="errors.rating" />

        <div class="grid gap-5 sm:grid-cols-2">
          <CheckoutField id="review-name" v-model="form.name" label="Prénom ou nom" autocomplete="given-name" :error="errors.name" />
          <CheckoutField
            id="review-email"
            v-model="form.email"
            label="E-mail (facultatif)"
            type="email"
            inputmode="email"
            autocomplete="email"
            hint="Jamais affiché publiquement"
            :error="errors.email"
          />
        </div>

        <div>
          <label for="review-comment" class="mb-1.5 block font-semibold text-[#222]">Votre avis</label>
          <textarea
            id="review-comment"
            v-model="form.comment"
            rows="4"
            maxlength="1000"
            placeholder="Qu'avez-vous pensé de ce produit ?"
            class="w-full rounded-xl border bg-white px-4 py-3 text-base text-[#222] outline-none placeholder:text-[#999] focus:ring-2"
            :class="errors.comment ? 'border-sale focus:ring-sale/20' : 'border-ink/20 focus:border-ink focus:ring-ink/10'"
            :aria-invalid="!!errors.comment"
            :aria-describedby="errors.comment ? 'review-comment-error' : undefined"
          />
          <div class="mt-1 flex justify-between gap-3 text-sm">
            <p v-if="errors.comment" id="review-comment-error" class="text-sale">{{ errors.comment }}</p>
            <span class="ml-auto text-[#888]">{{ form.comment.length }} / 1000</span>
          </div>
        </div>

        <!-- Piège à robots : invisible et inaccessible pour un humain -->
        <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] size-px opacity-0">

        <p v-if="failure" role="alert" class="rounded-xl bg-sale/10 p-3 text-sm font-semibold text-sale">{{ failure }}</p>

        <button
          type="submit"
          :disabled="pending"
          class="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition-colors duration-150 hover:bg-ink/90 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          <UIcon v-if="pending" name="i-lucide-loader-circle" class="size-5 animate-spin" />
          {{ pending ? 'Envoi…' : 'Publier mon avis' }}
        </button>
        <p class="text-xs text-[#666]">Les avis sont vérifiés par notre équipe avant d'être publiés.</p>
      </form>
    </div>
  </section>
</template>
