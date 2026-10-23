// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useHealthPicks() {
  return useLazyFetch('/api/health-picks', {
    key: 'health-picks',
    immediate: false,
    server: false,
    default: () => [],
  })
}
