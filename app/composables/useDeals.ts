// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useDeals() {
  return useLazyFetch('/api/deals', {
    key: 'deals',
    immediate: false,
    server: false,
    default: () => [],
  })
}
