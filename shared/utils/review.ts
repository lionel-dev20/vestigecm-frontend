// Avis clients : validés à l'identique dans le navigateur et sur le serveur
export interface ReviewForm {
  rating: number
  name: string
  email: string
  comment: string
}

export type ReviewErrors = Partial<Record<keyof ReviewForm, string>>

// Avis publié (approuvé dans WooCommerce)
export interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  // Acheteur vérifié : a commandé ce produit
  verified: boolean
}

export function validateReview(form: Partial<ReviewForm>): ReviewErrors {
  const errors: ReviewErrors = {}
  const text = (value?: string) => value?.trim() ?? ''

  if (!Number.isInteger(form.rating) || form.rating! < 1 || form.rating! > 5) errors.rating = 'Choisissez une note de 1 à 5 étoiles'
  if (text(form.name).length < 2 || text(form.name).length > 60) errors.name = 'Indiquez votre prénom ou votre nom'
  if (text(form.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(form.email))) errors.email = 'Adresse e-mail invalide'
  if (text(form.comment).length < 10) errors.comment = 'Votre avis doit faire au moins 10 caractères'
  else if (text(form.comment).length > 1000) errors.comment = '1000 caractères maximum'

  return errors
}
