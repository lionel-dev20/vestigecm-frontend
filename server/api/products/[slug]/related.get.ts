export default defineEventHandler(event => getRelatedProducts(getRouterParam(event, 'slug') ?? ''))
