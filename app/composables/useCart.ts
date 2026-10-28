import type { Product } from '#shared/types/product'

export interface CartItem {
  id: string
  name: string
  to: string
  image: string
  price: number
  quantity: number
}

// Panier stocké en cookie : conservé 30 jours et lisible par le serveur (rendu SSR sans saut)
export function useCart() {
  const cookie = useCookie<CartItem[]>('cart', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })
  // État partagé par tous les composants (header, page panier, fiche produit)
  const items = useState<CartItem[]>('cart', () => cookie.value)
  watch(items, (value) => { cookie.value = value }, { deep: true })

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function add(product: Product, quantity = 1) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) existing.quantity += quantity
    else items.value.push({ id: product.id, name: product.name, to: product.to, image: product.image, price: product.price, quantity })
  }

  function setQuantity(id: string, quantity: number) {
    const item = items.value.find(item => item.id === id)
    if (item) item.quantity = Math.max(1, quantity)
  }

  function remove(id: string) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, count, subtotal, add, setQuantity, remove, clear }
}
