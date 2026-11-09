import type { Testimonial, TestimonialsPage } from '#shared/types/pages'

// Page Témoignages : WordPress (ACF) avec repli champ par champ sur le contenu actuel
// Import : data/import/acf/groupes-champs-temoignages-carriere.json + pages-temoignages-carriere.xml
const { group, text, image } = acf

const testimonialsDefaults: Omit<TestimonialsPage, 'items'> = {
  banner: '/images/temoignages/banniere.jpg',
  intro: 'Suivez les témoignages des personnes qui utilisent déjà nos produits.',
  cta: {
    title: 'Vous aussi, partagez votre expérience',
    text: 'Envoyez-nous votre témoignage par WhatsApp : texte, photo ou vidéo.',
    label: 'Partager mon témoignage',
    message: 'Bonjour, je souhaite partager mon témoignage sur les produits VESTIGE.',
  },
}

// Champs ACF d'une page (par son slug), gardés 1 min ; une erreur n'est jamais mise en cache
const fetchPageFields = defineCachedFunction(async (slug: string) => {
  const pages = await wpFetch<{ acf?: unknown }[]>('/pages', { slug, acf_format: 'standard', _fields: 'acf' })
  return group(pages[0]?.acf)
}, { name: 'wp-page-acf', maxAge: 60, swr: false, getKey: (slug: string) => slug })

// Fiches « Témoignage », dans l'ordre choisi dans WordPress (champ « Ordre »)
const fetchTestimonials = defineCachedFunction(async () => {
  const items: { id: number; acf?: unknown }[] = []
  for (let page = 1; page <= 5; page++) {
    const batch = await wpFetch<{ id: number; acf?: unknown }[]>('/temoignages', {
      per_page: 100, page, orderby: 'menu_order', order: 'asc', acf_format: 'standard', _fields: 'id,acf',
    })
    items.push(...batch)
    if (batch.length < 100) break
  }
  return items
}, { name: 'wp-testimonials', maxAge: 60, swr: false })

function toTestimonial(id: number, fields: AcfFields): Testimonial | undefined {
  // Fichier envoyé dans WordPress, sinon lien MP4 ; sans vidéo, la fiche est ignorée
  const video = text(fields.video_file, text(fields.video_url, ''))
  if (!video) return
  const to = text(fields.link, '/c/kits-traitement')
  return {
    id: String(id),
    topic: text(fields.topic, 'Témoignage'),
    video,
    poster: image(fields.poster, posterFor(video)),
    duration: text(fields.duration, ''),
    to,
    linkLabel: text(fields.link_label, to.startsWith('/p/kit-') ? 'Voir le kit' : 'Voir'),
  }
}

async function safely<T>(load: () => Promise<T>, fallback: T) {
  if (!useRuntimeConfig().wordpress.url) return fallback
  try {
    return await load()
  }
  catch {
    return fallback
  }
}

export async function getTestimonialsPage(): Promise<TestimonialsPage> {
  const [fields, posts] = await Promise.all([
    safely(() => fetchPageFields('temoignages'), {}),
    safely(fetchTestimonials, []),
  ])
  const d = testimonialsDefaults
  const cta = group(fields.cta)
  const items = posts.flatMap(post => toTestimonial(post.id, group(post.acf)) ?? [])

  return {
    banner: image(fields.banner, d.banner),
    intro: text(fields.intro, d.intro),
    cta: {
      title: text(cta.title, d.cta.title),
      text: text(cta.text, d.cta.text),
      label: text(cta.button_label, d.cta.label),
      message: text(cta.message, d.cta.message),
    },
    // Aucun témoignage dans WordPress (pas encore importés) : les vidéos actuelles
    items: items.length ? items : defaultTestimonials,
  }
}
