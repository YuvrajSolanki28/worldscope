import React from 'react';
import type { Country } from '../types/country';
import { formatArea, formatNumber, listText } from '../utils/format';

export function CountryDetailsCard({ country }: { country: Country }) {
  const rows = [['Official name', country.officialName], ['Capital', country.capital], ['Region', `${country.region}${country.subregion ? ` (${country.subregion})` : ''}`], ['Population', formatNumber(country.population)], ['Area', formatArea(country.area)], ['Languages', listText(country.languages)], ['Currencies', listText(country.currencies)], [country.timezones.length > 1 ? 'Timezones' : 'Timezone', listText(country.timezones)]];
  return <section className="card overflow-hidden" aria-labelledby="key-info-heading"><div className="border-b border-line px-5 py-4"><h2 id="key-info-heading" className="font-semibold text-ink">Key information</h2></div><table className="w-full text-sm"><tbody>{rows.map(([label, value]) => <tr key={label} className="border-b border-line last:border-0"><th scope="row" className="w-36 bg-slate-50 px-5 py-3 text-left align-top font-medium text-subtle sm:w-44">{label}</th><td className="break-words px-5 py-3 text-ink">{value}</td></tr>)}</tbody></table></section>;
}
