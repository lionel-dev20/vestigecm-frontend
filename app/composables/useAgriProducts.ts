// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useAgriProducts() {
  return useLazyFetch('/api/agri-products', {
    key: 'agri-products',
    immediate: false,
    server: false,
    default: () => [],
  })
}
