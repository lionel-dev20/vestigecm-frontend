// Texte enrichi venant de WordPress : seules les balises de mise en forme sont conservées,
// sans aucun attribut (sauf un href sûr sur les liens) ; scripts, styles et iframes sont supprimés
const allowedTags = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'a', 'blockquote'])
const safeHref = /^(https?:\/\/|\/|mailto:|tel:)/i

export function sanitizeHtml(html: string) {
  return html
    .replace(/<(script|style|iframe|object|embed|form|svg|math|template)[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (tag, name: string, attributes: string) => {
      const tagName = name.toLowerCase()
      if (!allowedTags.has(tagName)) return ''
      if (tag.startsWith('</')) return `</${tagName}>`
      if (tagName === 'a') {
        const href = /href\s*=\s*["']([^"']*)["']/i.exec(attributes)?.[1] ?? ''
        return safeHref.test(href) ? `<a href="${href}">` : '<a>'
      }
      return `<${tagName}>`
    })
}
