const price = new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF', maximumFractionDigits: 0 })
const count = new Intl.NumberFormat('fr-FR')

export const formatPrice = (value: number) => price.format(value)
export const formatCount = (value: number) => count.format(value)
