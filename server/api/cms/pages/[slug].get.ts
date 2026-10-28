interface WpPage {
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
}

// Page éditée dans WordPress (À propos, CGV, Livraison…), par son slug
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  // _fields : WordPress ne renvoie que l'utile (réponse plus légère)
  const [page] = await wpFetch<WpPage[]>('/pages', { slug, _fields: 'title,content,excerpt' })
  if (!page) throw createError({ statusCode: 404, statusMessage: 'Page introuvable' })

  return {
    title: decodeEntities(page.title.rendered),
    html: page.content.rendered,
    excerpt: page.excerpt.rendered.replace(/<[^>]+>/g, '').trim(),
  }
})
