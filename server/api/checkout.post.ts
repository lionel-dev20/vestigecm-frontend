import type { CheckoutForm } from '#shared/utils/checkout'

interface CheckoutBody {
  customer: CheckoutForm
  items: { id: string; quantity: number }[]
}

interface WooOrder {
  id: number
  number: string
  total: string
}

// Crée la commande dans WooCommerce (POST /wc/v3/orders), paiement à la livraison
export default defineEventHandler(async (event) => {
  const body = await readBody<CheckoutBody>(event)

  // Même validation que dans le navigateur : on ne fait jamais confiance au client
  const errors = validateCheckout(body?.customer ?? {})
  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Formulaire incomplet', data: { errors } })
  }

  // Seuls l'ID WooCommerce et la quantité sont transmis : les prix sont recalculés par WooCommerce
  const items = Array.isArray(body.items) ? body.items : []
  const valid = items.length > 0 && items.every(item => /^\d+$/.test(item.id) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 20)
  if (!valid) throw createError({ statusCode: 422, statusMessage: 'Panier invalide' })

  const c = body.customer
  const address = {
    first_name: c.firstName.trim(),
    last_name: c.lastName.trim(),
    phone: `+237${normalizePhone(c.phone)}`,
    city: c.city.trim(),
    address_1: c.district.trim(),
    country: 'CM',
  }

  try {
    const order = await wooFetch<WooOrder>('/orders', {
      method: 'POST',
      body: {
        payment_method: 'cod',
        payment_method_title: 'Paiement à la livraison',
        set_paid: false,
        billing: address,
        shipping: address,
        line_items: items.map(item => ({ product_id: Number(item.id), quantity: item.quantity })),
        meta_data: [{ key: '_source', value: 'site-nuxt' }],
      },
    })
    return { number: order.number, total: Number(order.total) }
  }
  catch (error) {
    // Configuration manquante (503) : on garde le message ; refus WooCommerce : message neutre
    if ((error as { statusCode?: number }).statusCode === 503) throw error
    console.error('[checkout] commande WooCommerce refusée', error)
    throw createError({ statusCode: 502, statusMessage: 'La commande n\'a pas pu être enregistrée' })
  }
})
