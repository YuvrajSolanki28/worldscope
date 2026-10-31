import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GitCompare, Search } from 'lucide-react';
import { CountryCard } from '../components/CountryCard';
import { RegionCard } from '../components/RegionCard';
import { SampleDataNotice } from '../components/SampleDataNotice';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useCountries } from '../hooks/useCountries';
import { regions } from '../data/regions';
import { flagUrl } from '../utils/format';

const FEATURED = ['IND', 'JPN', 'DEU', 'FRA', 'BRA', 'CAN'];
const HERO = ['IND', 'JPN', 'DEU', 'FRA', 'BRA', 'CAN', 'USA', 'AUS', 'ZAF'];

export function Home() {
  const { countries, loading, error, retry } = useCountries();
  const featured = FEATURED.map((code) => countries.find((country) => country.code === code)).filter(Boolean);
  const heroFlags = HERO.map((code) => countries.find((country) => country.code === code)).filter(Boolean);

  return <div className="page-fade-in">
    <section className="border-b border-line bg-white">
      <div className="page-container grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div><SampleDataNotice /><h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">Discover Countries Around the World</h1><p className="mt-4 max-w-lg text-lg leading-relaxed text-subtle">Explore real country information, compare nations, save favourites, and discover source-linked history.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/explore" className="btn btn-primary px-6 py-3 text-base"><Search className="h-4 w-4" />Explore Countries</Link><Link to="/compare" className="btn btn-secondary px-6 py-3 text-base"><GitCompare className="h-4 w-4" />Compare Countries</Link></div></div>
        <div className="card p-4 sm:p-6">{loading ? <LoadingSpinner message="Loading the world…" /> : error ? <ErrorMessage message={error} onRetry={retry} /> : <><div className="grid grid-cols-3 gap-3 sm:gap-4">{heroFlags.map((country) => country && <Link key={country.code} to={`/country/${country.code}`} className="group overflow-hidden rounded-lg border border-line bg-slate-50 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"><img src={flagUrl(country, 320)} alt={country.flagAlt || `Flag of ${country.name}`} className="aspect-[3/2] w-full object-cover" /><span className="block truncate px-2 py-1.5 text-center text-xs font-medium text-subtle group-hover:text-brand">{country.name}</span></Link>)}</div><p className="mt-4 text-center text-sm text-subtle">{countries.length} countries across {new Set(countries.map((country) => country.region)).size} regions</p></>}</div>
      </div>
    </section>
    <section className="page-container py-14" aria-labelledby="featured-heading"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h2 id="featured-heading" className="text-2xl font-bold text-ink">Featured Countries</h2><p className="mt-1 text-subtle">A few popular countries to start exploring.</p></div><Link to="/explore" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover">View all countries<ArrowRight className="h-4 w-4" /></Link></div>{!loading && !error && <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((country) => country && <CountryCard key={country.code} country={country} />)}</div>}</section>
    <section className="page-container pb-4" aria-labelledby="regions-heading"><h2 id="regions-heading" className="text-2xl font-bold text-ink">Explore by Region</h2><p className="mt-1 text-subtle">Pick a region to see its countries.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{regions.map((region) => <RegionCard key={region.name} region={region} countryCount={countries.filter((country) => country.region === region.name).length} />)}</div></section>
  </div>;
}
