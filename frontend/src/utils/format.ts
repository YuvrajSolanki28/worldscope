export function formatNumber(value: number): string { return Number.isFinite(value) ? value.toLocaleString('en-US') : 'Not available'; }
export function formatArea(value: number): string { return Number.isFinite(value) ? `${value.toLocaleString('en-US')} km²` : 'Not available'; }
export function flagUrl(country: { flag: string; alpha2?: string }, width: 320 | 640 = 640): string { return country.flag || `https://flags.restcountries.com/v5/w${width}/${country.alpha2?.toLowerCase()}.png`; }
export function listText(values?: string[]): string { return values?.length ? values.join(', ') : 'Not available'; }
