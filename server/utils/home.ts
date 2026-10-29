import type { HomeContent, HomeDealCard } from '#shared/types/home'
import type { HealthKit } from '#shared/types/health-kit'
import type { Promo } from '#shared/types/promo'
import type { ShowcaseItem } from '#shared/types/showcase'

// Contenu de secours : identique aux valeurs pré-remplies de la page ACF (data/import/acf)
// Utilisé tant que la page « Accueil » n'existe pas, si WordPress ne répond pas, ou pour un champ vide
const productImage = '/images/products/placeholder.svg'

const defaults: HomeContent = {
  hero: [
    { title: 'Jusqu\'à -20%', subtitle: 'Les compléments que les experts prennent chaque jour', to: '/c/sante', image: '/images/hero/featured.jpg', bg: '#e7e3dc' },
    { title: 'Kit des maladies', subtitle: 'Des produits naturels pour accompagner les maladies chroniques', to: '/c/kit-maladies', image: '/images/hero/promo-1.jpg', bg: '#2f5f9e', tone: 'light' },
    { title: 'Notre promesse qualité', subtitle: 'Des produits authentiques, des standards de confiance', to: '/c/sante', image: '/images/hero/promo-2.jpg', bg: '#f2f2f0' },
  ],
  whatsapp: { title: 'Besoin d\'un conseil personnalisé ?', label: 'Rejoindre sur WhatsApp', to: 'https://wa.me/237699288607' },
  quality: {
    title: 'Notre promesse qualité',
    text: 'La médecine naturelle indienne (Ayurvéda) est désormais chez vous, grâce à la thérapie nutritionnelle cellulaire.',
    cards: [
      { title: 'Routine beauté', subtitle: 'Notre nouvelle gamme de soins', cta: 'Explorer la gamme', to: '/c/soins-visage-corps', image: '/images/showcase/card-1.jpg', bg: '#c9b39b', tone: 'light' },
      { title: 'Testé en laboratoire', subtitle: 'Pureté vérifiée à chaque lot', cta: 'Voir les compléments', to: '/c/sante', image: '/images/showcase/card-2.jpg', bg: '#1d2430', tone: 'light' },
      { title: 'Agriculture', subtitle: 'Des solutions pour vos cultures', cta: 'Voir l\'agriculture', to: '/c/agriculture', image: '/images/showcase/card-3.jpg', bg: '#2c3b2a', tone: 'light' },
    ],
  },
  deals: { title: 'Bons plans', to: '/c/sante?promo=1' },
  health: {
    title: 'Santé & maladies',
    label: 'En savoir plus',
    to: '/c/kit-maladies',
    intro: 'Chez VESTIGE, nous adoptons une approche holistique, qui agit à la racine des maladies, et non seulement sur les symptômes. Nous accompagnons efficacement des personnes souffrant de :',
    image: '/images/sante/banner.jpg',
    features: [
      { icon: 'i-lucide-microscope', text: 'Des ingrédients étudiés dans la littérature scientifique' },
      { icon: 'i-lucide-badge-check', text: 'Une fabrication conforme aux normes de qualité (BPF)' },
      { icon: 'i-lucide-clipboard-list', text: 'Un étiquetage détaillé et une origine des ingrédients tracée' },
      { icon: 'i-lucide-stethoscope', text: 'L\'accompagnement de professionnels de santé' },
    ],
    kits: [
      ['Diabète', '/c/diabete'],
      ['Faiblesse / impuissance sexuelle', '/c/kit-maladies'],
      ['Hypertension & hypotension', '/c/hypertension-coeur'],
      ['AVC & troubles de la mémoire', '/c/kit-maladies'],
      ['Arthrose, douleurs articulaires, rhumatismes', '/c/arthrose-articulations'],
      ['Prostate, infertilité, règles douloureuses', '/c/prostate'],
      ['Hernie discale, migraine, anémie', '/c/anemie-sante-feminine'],
      ['Tumeurs, cancers, infections pulmonaires', '/c/kit-maladies'],
      ['Ménopause et autres maladies chroniques', '/c/kit-maladies'],
    ].map(([name, to], index) => ({ id: `kit-${index + 1}`, name: name!, cta: 'Voir le kit', to: to!, image: productImage })),
  },
  banner: { title: 'Ayurvéda', subtitle: 'Notre nouvelle gamme de soins naturels', cta: 'Découvrir', to: '/c/sante', image: '/images/banners/ayurveda.jpg' },
  healthPicks: { title: 'Essentiels santé', to: '/c/sante' },
  categories: { eyebrow: 'Nos catégories', title: 'Acheter par catégorie', highlight: 'catégorie' },
  agriPicks: { title: 'Agriculture', to: '/c/agriculture' },
  dealCards: [
    { badge: '-25 % sur les cheveux', title: 'Offres spéciales soins des cheveux', highlight: 'soins des cheveux', text: 'Des actifs naturels pour fortifier et faire briller vos cheveux.', cta: 'Acheter', to: '/c/soins-visage-corps', image: '/images/promos/cheveux.jpg', tone: 'light' },
    { badge: '-20 % sur la peau', title: 'Économisez sur les soins de la peau', highlight: 'soins de la peau', text: 'Hydratation, éclat et protection au quotidien.', cta: 'Acheter', to: '/c/soins-visage-corps', image: '/images/promos/peau.jpg', tone: 'dark' },
  ],
  cta: {
    eyebrow: 'Offres de la semaine',
    title: 'Économies exceptionnelles : vos essentiels bien-être de la semaine',
    highlight: 'vos essentiels bien-être de la semaine',
    text: 'Chaque semaine, une sélection de produits naturels à prix réduit.',
    cta: 'Acheter',
    to: '/c/sante?promo=1',
    image: '/images/promos/semaine.jpg',
  },
  about: {
    title: 'Vous souffrez de douleurs articulaires, de lombalgies, de troubles digestifs, de fatigue persistante, ou vous vivez avec une maladie chronique comme le diabète ou l\'hypertension ?',
    html: `<p><strong>Et si, avant de chercher uniquement à faire disparaître les symptômes, vous commenciez par mieux comprendre ce qui se passe dans votre organisme ?</strong></p>
<p>Vous avez déjà essayé différentes solutions, mais vos problèmes persistent ou reviennent régulièrement ?</p>
<p>Bienvenue chez <strong>VESTIGE CAMEROUN – DOUALA LOGBABA</strong>, votre espace dédié à une approche globale de la santé et du bien-être, inspirée des principes de la médecine ayurvédique indienne, avec une attention particulière portée à l'alimentation, à l'hygiène de vie et à l'équilibre global.</p>
<h3>Chez nous, le bilan est la première étape</h3>
<p>Avant toute prise en charge ou tout accompagnement, nous commençons par un bilan au Quantum ou au Bioplasm.</p>
<p>L'objectif est de recueillir davantage d'informations sur certains paramètres de l'organisme afin de mieux orienter et personnaliser l'accompagnement proposé.</p>
<h3>Notre approche repose ensuite sur plusieurs prestations complémentaires</h3>
<ul>
<li><strong>Bilan Quantum</strong> — Un outil d'évaluation complémentaire utilisé dans notre démarche de santé et bien-être.</li>
<li><strong>Bilan Bioplasm</strong> — Une autre méthode d'évaluation complémentaire permettant de recueillir différentes informations sur l'organisme.</li>
<li><strong>Produits naturels Vestige</strong> — Une gamme de produits intégrée à notre approche, avec des conseils adaptés à l'alimentation et à l'hygiène de vie.</li>
<li><strong>Thérapie Tera Hertz</strong> — Une prestation proposée dans le cadre du bien-être et du confort corporel, qui aide à réactiver la circulation sanguine.</li>
<li><strong>Détoxification ionique</strong> — Une séance complémentaire de bien-être et de détente qui aide à éliminer les toxines du corps.</li>
</ul>
<h3>Notre principe est simple</h3>
<p><strong>Évaluer → Comprendre → Personnaliser → Accompagner</strong></p>
<p>Parce que chaque personne est différente, nous ne voulons pas simplement vous proposer une solution au hasard. Nous privilégions une démarche qui commence par l'écoute et l'évaluation, puis qui permet d'orienter l'accompagnement en fonction des besoins identifiés.</p>
<p><strong>Prenez soin de votre santé. Commencez par mieux comprendre votre organisme.</strong></p>`,
    address: 'VESTIGE CAMEROUN – DOUALA LOGBABA · Logbaba 2 Poteaux',
    whatsapp: '699 288 607',
  },
}

// ---------- Lecture des champs ACF (avec repli champ par champ) ----------

type Fields = Record<string, unknown>
const group = (value: unknown): Fields => (value && typeof value === 'object' && !Array.isArray(value) ? value as Fields : {})
const text = (value: unknown, fallback: string) => (typeof value === 'string' && value.trim() ? value.trim() : fallback)
// Champ image ACF (format « array ») : { url, … } ; vide = false ou null
const image = (value: unknown, fallback: string) => {
  const url = group(value).url
  return typeof url === 'string' && url ? url : fallback
}

function heroCard(acf: Fields, fallback: Promo): Promo {
  return {
    title: text(acf.title, fallback.title),
    subtitle: text(acf.subtitle, fallback.subtitle),
    to: text(acf.link, fallback.to),
    image: image(acf.image, fallback.image),
    bg: text(acf.bg_color, fallback.bg),
    tone: acf.light_text === undefined ? fallback.tone : acf.light_text ? 'light' : 'dark',
  }
}

function qualityCard(acf: Fields, fallback: ShowcaseItem): ShowcaseItem {
  return { ...heroCard(acf, fallback), cta: text(acf.button_label, fallback.cta) }
}

function dealCard(acf: Fields, fallback: HomeDealCard): HomeDealCard {
  return {
    badge: text(acf.badge, fallback.badge),
    title: text(acf.title, fallback.title),
    highlight: text(acf.highlight, fallback.highlight),
    text: text(acf.text, fallback.text),
    cta: text(acf.button_label, fallback.cta),
    to: text(acf.link, fallback.to),
    image: image(acf.image, fallback.image),
    tone: acf.style === 'dark' || acf.style === 'light' ? acf.style : fallback.tone,
  }
}

function toHome(acf: Fields): HomeContent {
  const d = defaults
  const hero = group(acf.hero)
  const whatsapp = group(acf.whatsapp)
  const quality = group(acf.quality)
  const health = group(acf.health)
  const banner = group(acf.banner)
  const categories = group(acf.categories)
  const dealCards = group(acf.deal_cards)
  const cta = group(acf.cta)
  const about = group(acf.about)
  const linkSection = (acfSection: unknown, fallback: { title: string; to: string }) => ({
    title: text(group(acfSection).title, fallback.title),
    to: text(group(acfSection).link, fallback.to),
  })

  // Maladies : une maladie dont le nom est vidé dans WordPress est masquée
  const kits: HealthKit[] = d.health.kits.flatMap((fallback, index) => {
    const kit = group(health[`kit_${index + 1}`])
    if (kit.name !== undefined && !text(kit.name, '')) return []
    return [{ id: fallback.id, name: text(kit.name, fallback.name), cta: text(kit.button_label, fallback.cta), to: text(kit.link, fallback.to), image: image(kit.image, fallback.image) }]
  })

  return {
    hero: d.hero.map((fallback, index) => heroCard(group(hero[`card_${index + 1}`]), fallback)),
    whatsapp: { title: text(whatsapp.title, d.whatsapp.title), label: text(whatsapp.button_label, d.whatsapp.label), to: text(whatsapp.link, d.whatsapp.to) },
    quality: {
      title: text(quality.title, d.quality.title),
      text: text(quality.text, d.quality.text),
      cards: d.quality.cards.map((fallback, index) => qualityCard(group(quality[`card_${index + 1}`]), fallback)),
    },
    deals: linkSection(acf.deals, d.deals),
    health: {
      title: text(health.title, d.health.title),
      label: text(health.button_label, d.health.label),
      to: text(health.link, d.health.to),
      intro: text(health.intro, d.health.intro),
      image: image(health.background, d.health.image),
      features: d.health.features.map((fallback, index) => {
        const feature = group(health[`feature_${index + 1}`])
        return { icon: text(feature.icon, fallback.icon), text: text(feature.text, fallback.text) }
      }),
      kits,
    },
    banner: {
      title: text(banner.title, d.banner.title),
      subtitle: text(banner.subtitle, d.banner.subtitle),
      cta: text(banner.button_label, d.banner.cta),
      to: text(banner.link, d.banner.to),
      image: image(banner.image, d.banner.image),
    },
    healthPicks: linkSection(acf.health_picks, d.healthPicks),
    categories: {
      eyebrow: text(categories.eyebrow, d.categories.eyebrow),
      title: text(categories.title, d.categories.title),
      highlight: text(categories.highlight, d.categories.highlight),
    },
    agriPicks: linkSection(acf.agri_picks, d.agriPicks),
    dealCards: d.dealCards.map((fallback, index) => dealCard(group(dealCards[`card_${index + 1}`]), fallback)),
    cta: {
      eyebrow: text(cta.eyebrow, d.cta.eyebrow),
      title: text(cta.title, d.cta.title),
      highlight: text(cta.highlight, d.cta.highlight),
      text: text(cta.text, d.cta.text),
      cta: text(cta.button_label, d.cta.cta),
      to: text(cta.link, d.cta.to),
      image: image(cta.image, d.cta.image),
    },
    about: {
      title: text(about.title, d.about.title),
      html: sanitizeHtml(text(about.content, d.about.html)),
      address: text(about.address, d.about.address),
      whatsapp: text(about.whatsapp, d.about.whatsapp),
    },
  }
}

// Champs ACF de la page « accueil », gardés 1 min (une erreur n'est jamais mise en cache)
const fetchHomeFields = defineCachedFunction(async () => {
  const pages = await wpFetch<{ acf?: unknown }[]>('/pages', { slug: 'accueil', acf_format: 'standard', _fields: 'acf' })
  return group(pages[0]?.acf)
}, { name: 'wp-home', maxAge: 60, swr: false })

// Toujours une page d'accueil complète : ACF si disponible, sinon le contenu de secours
export async function getHome(): Promise<HomeContent> {
  if (!useRuntimeConfig().wordpress.url) return { ...defaults, about: { ...defaults.about, html: sanitizeHtml(defaults.about.html) } }
  try {
    return toHome(await fetchHomeFields())
  }
  catch {
    return toHome({})
  }
}
