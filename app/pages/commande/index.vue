<script setup lang="ts">
import type { CheckoutErrors, CheckoutForm } from '#shared/utils/checkout'

const { items, subtotal, clear } = useCart()

// Panier vide : rien à commander
if (!items.value.length) await navigateTo('/panier', { replace: true })

useSeoMeta({ title: 'Finaliser ma commande', robots: 'noindex, follow' })

const form = reactive<CheckoutForm>({ lastName: '', firstName: '', phone: '', city: '', district: '' })
const errors = ref<CheckoutErrors>({})
const pending = ref(false)
const failure = ref('')

// Client déjà venu : coordonnées pré-remplies (navigateur uniquement)
const storageKey = 'checkout-customer'
onMounted(() => {
  try {
    Object.assign(form, JSON.parse(localStorage.getItem(storageKey) ?? '{}'))
  }
  catch {}
})

// Vérifie un champ quand on le quitte, puis en direct tant qu'il est en erreur
function check(field: keyof CheckoutForm) {
  errors.value = { ...errors.value, [field]: validateCheckout(form)[field] }
}

// Téléphone : « +237 676653634 » devient « 6 76 65 36 34 » (le +237 est déjà affiché)
function checkPhone() {
  form.phone = formatPhone(form.phone)
  check('phone')
}
watch(form, () => {
  for (const field of Object.keys(errors.value) as (keyof CheckoutForm)[]) {
    if (errors.value[field]) check(field)
  }
})

async function submit() {
  // Couvre l'auto-remplissage du navigateur, qui ne déclenche pas toujours la sortie de champ
  form.phone = formatPhone(form.phone)
  errors.value = validateCheckout(form)
  const firstError = Object.keys(errors.value)[0]
  if (firstError) {
    document.getElementById(`checkout-${firstError}`)?.focus()
    return
  }

  pending.value = true
  failure.value = ''
  try {
    const order = await $fetch('/api/checkout', {
      method: 'POST',
      body: { customer: form, items: items.value.map(item => ({ id: item.id, quantity: item.quantity })) },
    })
    try {
      localStorage.setItem(storageKey, JSON.stringify(form))
    }
    catch {}
    clear()
    await navigateTo({ path: '/commande/confirmation', query: { numero: order.number } })
  }
  catch (error) {
    const data = (error as { data?: { statusMessage?: string; data?: { errors?: CheckoutErrors } } }).data
    if (data?.data?.errors) errors.value = data.data.errors
    else failure.value = data?.statusMessage ?? 'Une erreur est survenue.'
  }
  finally {
    pending.value = false
  }
}

// Plan B : la commande part sur WhatsApp, déjà rédigée
const whatsappOrder = computed(() => {
  const lines = items.value.map(item => `• ${item.quantity} × ${item.name}`).join('\n')
  const text = `Bonjour, je souhaite commander :\n${lines}\nTotal : ${formatPrice(subtotal.value)}`
  return `https://wa.me/237676653634?text=${encodeURIComponent(text)}`
})
</script>

<template>
  <div class="mx-auto max-w-350 px-4 py-6 lg:px-8 lg:py-10">
    <BaseBreadcrumb :links="[{ label: 'Panier', to: '/panier' }, { label: 'Commande' }]" />

    <h1 class="mt-4 text-2xl font-bold text-[#222] lg:text-3xl">Finaliser ma commande</h1>
    <p class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666]">
      <span class="flex items-center gap-1.5"><UIcon name="i-lucide-user-x" class="size-4" /> Pas de compte à créer</span>
      <span class="flex items-center gap-1.5"><UIcon name="i-lucide-banknote" class="size-4" /> Paiement à la livraison</span>
    </p>

    <!-- Bureau : formulaire à gauche, récapitulatif collé à droite · Mobile : formulaire puis récapitulatif -->
    <div class="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <form novalidate class="space-y-5 rounded-2xl border border-ink/10 bg-white p-5 lg:p-8" @submit.prevent="submit">
        <h2 class="text-lg font-bold text-[#222]">Vos coordonnées de livraison</h2>

        <div class="grid gap-5 sm:grid-cols-2">
          <CheckoutField id="checkout-lastName" v-model="form.lastName" label="Nom" autocomplete="family-name" :error="errors.lastName" @blur="check('lastName')" />
          <CheckoutField id="checkout-firstName" v-model="form.firstName" label="Prénom" autocomplete="given-name" :error="errors.firstName" @blur="check('firstName')" />
        </div>

        <CheckoutField
          id="checkout-phone"
          v-model="form.phone"
          label="Numéro de téléphone"
          prefix="+237"
          type="tel"
          inputmode="tel"
          autocomplete="tel-national"
          placeholder="6 76 65 36 34"
          hint="Le livreur vous appellera sur ce numéro"
          :error="errors.phone"
          @blur="checkPhone"
        />

        <div class="grid gap-5 sm:grid-cols-2">
          <CheckoutField
            id="checkout-city"
            v-model="form.city"
            label="Ville"
            list="checkout-cities"
            autocomplete="address-level2"
            placeholder="Douala"
            :error="errors.city"
            @blur="check('city')"
          />
          <CheckoutField
            id="checkout-district"
            v-model="form.district"
            label="Quartier"
            autocomplete="address-level3"
            placeholder="Ex. Logbaba, Bonapriso"
            :error="errors.district"
            @blur="check('district')"
          />
        </div>
        <datalist id="checkout-cities">
          <option v-for="city in cameroonCities" :key="city" :value="city" />
        </datalist>

        <!-- Moyen de paiement unique : affiché, pas à choisir -->
        <div class="flex items-start gap-3 rounded-xl border-2 border-leaf bg-leaf/5 p-4">
          <UIcon name="i-lucide-circle-check" class="mt-0.5 size-5 shrink-0 text-leaf" />
          <div>
            <p class="font-semibold text-[#222]">Paiement à la livraison</p>
            <p class="text-sm text-[#555]">En espèces ou par Mobile Money, à la réception de votre colis.</p>
          </div>
        </div>

        <div v-if="failure" role="alert" class="rounded-xl bg-sale/10 p-4 text-sm text-[#222]">
          <p class="font-semibold text-sale">{{ failure }}</p>
          <p class="mt-1">
            Réessayez, ou
            <NuxtLink :to="whatsappOrder" target="_blank" class="font-semibold text-leaf underline">envoyez votre commande sur WhatsApp</NuxtLink>.
          </p>
        </div>

        <button
          type="submit"
          :disabled="pending"
          class="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-4 text-base font-bold sm:text-lg text-white transition-colors duration-150 hover:bg-cta/90 disabled:cursor-wait disabled:opacity-70"
        >
          <UIcon :name="pending ? 'i-lucide-loader-circle' : 'i-lucide-lock'" class="size-5" :class="pending && 'animate-spin'" />
          {{ pending ? 'Envoi en cours…' : `Confirmer ma commande · ${formatPrice(subtotal)}` }}
        </button>

        <p class="text-center text-xs text-[#666]">
          En confirmant, vous acceptez nos <NuxtLink to="/cgv" class="underline">conditions générales de vente</NuxtLink>.
        </p>
      </form>

      <aside class="lg:sticky lg:top-28 lg:self-start">
        <CheckoutOrderSummary />
      </aside>
    </div>
  </div>
</template>
