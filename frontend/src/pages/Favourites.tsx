import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { CountryCard } from '../components/CountryCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useFavourites } from '../contexts/FavouritesContext';
import { useCountries } from '../hooks/useCountries';

export function Favourites() {
  const { favourites, removeFavourite } = useFavourites(); const data = useCountries(); const saved = data.countries.filter((country) => favourites.includes(country.code));
  return <div className="page-fade-in page-container py-10 md:py-12"><header><h1 className="text-3xl font-bold tracking-tight text-ink">My Favourite Countries</h1><p className="mt-2 text-subtle">{saved.length ? `You have saved ${saved.length} ${saved.length === 1 ? 'country' : 'countries'}.` : 'Countries you save will appear here.'}</p></header><div className="mt-8">{data.loading ? <LoadingSpinner /> : data.error ? <ErrorMessage message={data.error} onRetry={data.retry} /> : saved.length === 0 ? <EmptyState icon={<Heart className="h-6 w-6" />} title="You haven't saved any countries yet." message="Tap the heart on any country card to save it here."><Link to="/explore" className="btn btn-primary">Explore Countries</Link></EmptyState> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{saved.map((country) => <CountryCard key={country.code} country={country} showPopulation onRemove={() => removeFavourite(country.code)} />)}</div>}</div></div>;
}
