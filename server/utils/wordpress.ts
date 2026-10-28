// Lien de menu renvoyé au site (même forme que NavLink côté app)
export interface MenuLink {
  label: string
  to: string
}

interface WpMenuItem {
  id: number
  title: { rendered: string }
  url: string
  parent: number
  menu_order: number
}

// Client WordPress REST (côté serveur) : contenu et menus
export async function wpFetch<T>(path: string, query?: Record<string, string | number>) {
  const { wordpress } = useRuntimeConfig()
  if (!wordpress.url) throw createError({ statusCode: 503, statusMessage: 'WordPress non configuré (NUXT_WORDPRESS_URL)' })

  // Mot de passe d'application : requis pour les menus, facultatif pour pages et articles
  const auth = wordpress.username && wordpress.appPassword
    ? { Authorization: `Basic ${btoa(`${wordpress.username}:${wordpress.appPassword}`)}` }
    : undefined

  try {
    return await $fetch<T>(`/wp-json/wp/v2${path}`, { baseURL: wordpress.url, query, headers: auth })
  }
  catch (error) {
    throw upstreamError('Contenu', error)
  }
}

// Menu WordPress → liens du site (niveau 1, dans l'ordre défini dans WordPress)
export async function getWpMenu(menuId: string | number): Promise<MenuLink[]> {
  const { wordpress } = useRuntimeConfig()
  const items = await wpFetch<WpMenuItem[]>('/menu-items', { menus: menuId, per_page: 100 })

  return items
    .filter(item => item.parent === 0)
    .sort((a, b) => a.menu_order - b.menu_order)
    .map(item => ({ label: decodeEntities(item.title.rendered), to: toLocalPath(item.url, wordpress.url) }))
}

// Les liens internes WordPress deviennent des chemins du site Nuxt
function toLocalPath(url: string, wpUrl: string) {
  return url.startsWith(wpUrl) ? new URL(url).pathname : url
}

// WordPress renvoie les titres encodés (&amp;, &#8217;…)
export function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
}
