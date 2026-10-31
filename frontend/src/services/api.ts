import type { Country, CountryHistory } from '../types/country';
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { headers: { Accept: 'application/json' }, signal });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'The request could not be completed.');
  return payload.data as T;
}
export const api = {
  countries: (signal?: AbortSignal) => request<Country[]>('/countries', signal),
  country: (code: string, signal?: AbortSignal) => request<Country>(`/countries/${encodeURIComponent(code)}`, signal),
  history: (code: string, signal?: AbortSignal) => request<CountryHistory>(`/history/${encodeURIComponent(code)}`, signal)
};
