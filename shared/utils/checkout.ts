// Formulaire de commande : validé à l'identique dans le navigateur et sur le serveur
export interface CheckoutForm {
  lastName: string
  firstName: string
  phone: string
  city: string
  district: string
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

// Suggestions de villes (saisie libre acceptée)
export const cameroonCities = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Ngaoundéré', 'Bertoua',
  'Kribi', 'Limbé', 'Buéa', 'Ebolowa', 'Kumba', 'Nkongsamba', 'Edéa', 'Dschang',
]

// « +237 6 76 65 36 34 » → « 676653634 »
export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 12 && digits.startsWith('237') ? digits.slice(3) : digits
}

// « 676653634 » → « 6 76 65 36 34 » (inchangé si le numéro est incomplet)
export function formatPhone(value: string) {
  const digits = normalizePhone(value)
  return digits.length === 9 ? digits.replace(/^(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5') : value
}

export function validateCheckout(form: Partial<CheckoutForm>): CheckoutErrors {
  const errors: CheckoutErrors = {}
  const text = (value?: string) => value?.trim() ?? ''

  if (text(form.lastName).length < 2) errors.lastName = 'Indiquez votre nom'
  if (text(form.firstName).length < 2) errors.firstName = 'Indiquez votre prénom'
  // Numéro camerounais : 9 chiffres, commençant par 6 (mobile) ou 2 (fixe)
  if (!/^[62]\d{8}$/.test(normalizePhone(form.phone ?? ''))) errors.phone = 'Numéro à 9 chiffres, par ex. 6 76 65 36 34'
  if (text(form.city).length < 2) errors.city = 'Indiquez votre ville'
  if (text(form.district).length < 2) errors.district = 'Indiquez votre quartier'

  return errors
}
