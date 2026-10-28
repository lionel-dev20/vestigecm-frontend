// Menu principal géré dans WordPress (Apparence > Menus)
export default defineEventHandler(() => {
  const { wordpress } = useRuntimeConfig()
  if (!wordpress.menuId) throw createError({ statusCode: 503, statusMessage: 'Menu non configuré (NUXT_WORDPRESS_MENU_ID)' })
  return getWpMenu(wordpress.menuId)
})
