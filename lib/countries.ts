import rawCountries from '@/data/gold/countries.json'

export type Country = {
  name: string
  context: string
}

export const COUNTRIES: Country[] = (rawCountries as unknown) as Country[]

function normalizeText(text: string) {
  return text.trim().toLowerCase()
}

export function findRelevantCountry(question: string): Country | null {
  const normalized = normalizeText(question)
  if (!normalized) return null

  const exactName = COUNTRIES.find((country) => normalized.includes(country.name.toLowerCase()))
  if (exactName) return exactName

  // Check if the question mentions content from any country's context
  return COUNTRIES.find((country) =>
    normalizeText(country.context).split(/\W+/).some((token) => token && normalized.includes(token))
  ) || null
}

export function serializeCountryContext(country: Country): string {
  return country.context
}

export function getCountryNameList() {
  return COUNTRIES.map((country) => country.name).join(', ')
}
