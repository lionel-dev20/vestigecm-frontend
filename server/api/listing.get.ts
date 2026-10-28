// Liste de produits filtrée, triée et paginée
// Catégorie : /api/listing?category=sante&promo=1&tri=price-asc&page=2
// Recherche : /api/listing?q=collagene&note=4
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const category = query.category ? String(query.category) : undefined
  const q = query.q ? String(query.q).trim().slice(0, 80) : undefined
  return listProducts(parseListingFilters(query), { category, q })
})
