import type { CountryEvaluation } from "../types/country";
import argentina from "../data/countries/argentina.json";
import chile from "../data/countries/chile.json";
import paraguay from "../data/countries/paraguay.json";
import uruguay from "../data/countries/uruguay.json";

export const countries = [argentina, uruguay, chile, paraguay] as CountryEvaluation[];

export function slugifyCountry(countryName: string) {
  return countryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getCountryBySlug(slug: string) {
  return countries.find((country) => slugifyCountry(country.country) === slug);
}
