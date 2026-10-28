// Erreur d'un service externe (WooCommerce, WordPress) : le détail reste dans les journaux du serveur,
// le navigateur reçoit un message neutre, sans URL de l'admin ni message technique
export function upstreamError(service: string, error: unknown) {
  const status = (error as { statusCode?: number }).statusCode
  console.error(`[${service}] requête refusée (${status ?? 'réseau'})`, (error as Error).message)
  return createError({ statusCode: 502, statusMessage: `${service} momentanément indisponible` })
}
