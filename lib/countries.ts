import rawCountries from '@/data/gold/countries.json'

export type Country = {
  name: string
  capital: string
  population: string
  region: string
  languages: string[]
  facts: string
}

export const COUNTRIES: Country[] = rawCountries as Country[]

function normalizeText(text: string) {
  return text.trim().toLowerCase()
}

export function findRelevantCountry(question: string): Country | null {
  const normalized = normalizeText(question)
  if (!normalized) return null

  const exactName = COUNTRIES.find((country) => normalized.includes(country.name.toLowerCase()))
  if (exactName) return exactName

  const capitalMatch = COUNTRIES.find((country) => country.capital && normalized.includes(country.capital.toLowerCase()))
  if (capitalMatch) return capitalMatch

  const regionMatch = COUNTRIES.find((country) => country.region && normalized.includes(country.region.toLowerCase()))
  if (regionMatch) return regionMatch

  const languageMatch = COUNTRIES.find((country) =>
    country.languages && country.languages.some((language) => normalized.includes(language.toLowerCase()))
  )
  if (languageMatch) return languageMatch

  return COUNTRIES.find((country) => country.facts && normalizeText(country.facts).split(/\W+/).some((token) => token && normalized.includes(token))) || null
}

export function serializeCountryContext(country: Country): string {
  return `Name: ${country.name}\nCapital: ${country.capital || 'Unknown'}\nPopulation: ${country.population || 'Unknown'}\nRegion: ${country.region || 'Unknown'}\nLanguages: ${country.languages?.join(', ') || 'Unknown'}\nFacts: ${country.facts || 'No facts available'}`
}

export function getCountryNameList() {
  return COUNTRIES.map((country) => country.name).join(', ')
}
