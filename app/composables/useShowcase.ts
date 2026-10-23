// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useShowcase() {
  return useLazyFetch('/api/showcase', {
    key: 'showcase',
    immediate: false,
    server: false,
    default: () => [],
  })
}
