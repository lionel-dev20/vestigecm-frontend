// À la demande : rien n'est chargé tant qu'execute() n'est pas appelé
export function useAyurvedaProducts() {
  return useLazyFetch('/api/ayurveda-products', {
    key: 'ayurveda-products',
    immediate: false,
    server: false,
    default: () => [],
  })
}
