import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Globe, Trash2, Users } from 'lucide-react';
import { FavouriteButton } from './FavouriteButton';
import type { Country } from '../types/country';
import { flagUrl, formatNumber } from '../utils/format';

export function CountryCard({ country, showPopulation = false, showFavourite = false, onRemove }: { country: Country; showPopulation?: boolean; showFavourite?: boolean; onRemove?: () => void }) {
  return <article className="card card-lift flex flex-col overflow-hidden"><div className="relative aspect-[16/10] border-b border-line bg-slate-100"><img src={flagUrl(country)} alt={country.flagAlt || `Flag of ${country.name}`} loading="lazy" className="h-full w-full object-cover" />{showFavourite && <div className="absolute right-3 top-3"><FavouriteButton countryCode={country.code} countryName={country.name} /></div>}</div><div className="flex flex-1 flex-col p-5"><h3 className="text-lg font-semibold text-ink">{country.name}</h3><dl className="mt-3 space-y-2 text-sm"><Info icon={<Building2 className="h-4 w-4" />} label="Capital" value={country.capital} /><Info icon={<Globe className="h-4 w-4" />} label="Region" value={country.region} />{showPopulation && <Info icon={<Users className="h-4 w-4" />} label="Population" value={formatNumber(country.population)} />}</dl><div className="mt-5 flex gap-2 pt-1"><Link to={`/country/${country.code}`} className="btn btn-primary flex-1">View Details</Link>{onRemove && <button type="button" onClick={onRemove} className="btn btn-secondary hover:border-red-300 hover:text-red-600" aria-label={`Remove ${country.name} from favourites`}><Trash2 className="h-4 w-4" />Remove</button>}</div></div></article>;
}
function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-2"><span className="text-subtle">{icon}</span><dt className="text-subtle">{label}:</dt><dd className="truncate font-medium text-ink">{value}</dd></div>; }
