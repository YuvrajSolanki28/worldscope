import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const BASE_URL = 'https://api.restcountries.com/countries/v5';
const cache = { countries: null, expiresAt: 0 };
const asArray = (value) => Array.isArray(value) ? value : value == null ? [] : [value];
const nameOf = (value) => typeof value === 'string' ? value : value?.name || value?.name_english || value?.common || value?.code || '';

export function normalizeCountry(raw) {
  const alpha2 = raw.codes?.alpha_2 || raw.cca2 || '';
  const alpha3 = raw.codes?.alpha_3 || raw.cca3 || '';
  const currencies = Array.isArray(raw.currencies) ? raw.currencies.map(nameOf) : Object.values(raw.currencies || {}).map(nameOf);
  const languages = Array.isArray(raw.languages) ? raw.languages.map(nameOf) : Object.values(raw.languages || {}).map(nameOf);
  const capital = asArray(raw.capitals ?? raw.capital).map(nameOf).filter(Boolean).join(', ');
  return {
    code: alpha3,
    alpha2,
    name: raw.names?.common || raw.name?.common || raw.name || 'Unknown',
    officialName: raw.names?.official || raw.name?.official || raw.name || 'Not available',
    capital: capital || 'Not available',
    region: raw.region || 'Not available',
    subregion: raw.subregion || '',
    population: Number(raw.population) || 0,
    area: Number(raw.area?.kilometers ?? raw.area) || 0,
    flag: raw.flag?.url_svg || raw.flag?.url_png || raw.flag?.url || raw.flags?.svg || raw.flags?.png || (alpha2 ? `https://flags.restcountries.com/v5/w640/${alpha2.toLowerCase()}.png` : ''),
    flagAlt: raw.flag?.description || raw.flag?.alt || raw.flags?.alt || '',
    languages: languages.filter(Boolean),
    currencies: currencies.filter(Boolean),
    timezones: asArray(raw.timezones).filter(Boolean),
    borders: asArray(raw.borders).filter(Boolean),
    maps: { google: raw.maps?.google || raw.maps?.google_maps || raw.maps?.googleMaps || '', openStreet: raw.maps?.openstreet || raw.maps?.openstreetmap || raw.maps?.openStreetMaps || '' },
    coordinates: raw.coordinates ? [raw.coordinates.lat, raw.coordinates.lng] : asArray(raw.latlng),
    continents: asArray(raw.continents).map(nameOf).filter(Boolean),
    independent: raw.independent ?? null,
  };
}

async function upstream(path, signal) {
  if (!env.countriesApiKey) throw new AppError('REST Countries is not configured. Add REST_COUNTRIES_API_KEY to backend/.env.', 503, 'COUNTRY_API_NOT_CONFIGURED');
  let response;
  try { response = await fetch(`${BASE_URL}${path}`, { headers: { Authorization: `Bearer ${env.countriesApiKey}`, Accept: 'application/json' }, signal }); }
  catch (error) { if (error.name === 'AbortError') throw new AppError('The country data provider timed out.', 504, 'UPSTREAM_TIMEOUT'); throw new AppError('The country data provider is unreachable.', 502, 'UPSTREAM_UNAVAILABLE'); }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new AppError(body.errors?.[0]?.message || `Country provider returned HTTP ${response.status}.`, response.status === 404 ? 404 : 502, 'UPSTREAM_ERROR');
  return body.data?.objects || [];
}

export async function getCountries({ force = false } = {}) {
  if (!force && cache.countries && cache.expiresAt > Date.now()) return cache.countries;
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const pages = await Promise.all([0, 100, 200].map((offset) => upstream(`?limit=100&offset=${offset}`, controller.signal)));
    const countries = pages.flat().map(normalizeCountry).filter((c) => c.code).sort((a, b) => a.name.localeCompare(b.name));
    if (!countries.length) throw new AppError('The country provider returned no country records.', 502, 'EMPTY_UPSTREAM_RESPONSE');
    cache.countries = countries; cache.expiresAt = Date.now() + env.cacheTtl; return countries;
  } finally { clearTimeout(timeout); }
}

export async function getCountry(code) { const normalized = String(code).trim().toUpperCase(); if (!/^[A-Z]{2,3}$/.test(normalized)) throw new AppError('Country code must contain two or three letters.', 400, 'INVALID_COUNTRY_CODE'); const countries = await getCountries(); const country = countries.find((item) => item.code === normalized || item.alpha2 === normalized); if (!country) throw new AppError('Country not found.', 404, 'COUNTRY_NOT_FOUND'); return country; }
export function clearCountryCache() { cache.countries = null; cache.expiresAt = 0; }
