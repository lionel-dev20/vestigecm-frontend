// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useHealthKits() {
  return useLazyFetch('/api/health-kits', {
    key: 'health-kits',
    immediate: false,
    server: false,
    default: () => [],
  })
}
