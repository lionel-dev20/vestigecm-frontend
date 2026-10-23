// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useCategories() {
  return useLazyFetch('/api/categories', {
    key: 'categories',
    immediate: false,
    server: false,
    default: () => [],
  })
}
