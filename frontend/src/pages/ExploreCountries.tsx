import React from 'react';
import { SearchX } from 'lucide-react';
import { CountryCard } from '../components/CountryCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Pagination } from '../components/Pagination';
import { RegionFilter } from '../components/RegionFilter';
import { SampleDataNotice } from '../components/SampleDataNotice';
import { SearchBar } from '../components/SearchBar';
import { SortSelect } from '../components/SortSelect';
import { useExploreCountries } from '../hooks/useExploreCountries';

export function ExploreCountries() {
  const explore = useExploreCountries();
  return <div className="page-fade-in page-container py-10 md:py-12"><header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-3xl font-bold tracking-tight text-ink">Explore Countries</h1><p className="mt-2 max-w-xl text-subtle">Search for a country, filter by region, and open any card to see its full details.</p></div><SampleDataNotice /></header><div className="card mt-8 grid gap-3 p-4 md:grid-cols-[1fr_200px_220px]"><SearchBar value={explore.search} onChange={explore.setSearch} /><RegionFilter value={explore.region} onChange={explore.setRegion} /><SortSelect value={explore.sort} onChange={explore.setSort} /></div><div className="mt-8">{explore.status === 'loading' && <LoadingSpinner />}{explore.status === 'error' && <ErrorMessage message={explore.error} onRetry={explore.retry} />}{explore.status === 'ready' && explore.totalResults === 0 && <EmptyState icon={<SearchX className="h-6 w-6" />} title="No countries found" message="Try a different name or region."><button type="button" onClick={explore.clearFilters} className="btn btn-primary">Clear filters</button></EmptyState>}{explore.status === 'ready' && explore.totalResults > 0 && <><p className="mb-4 text-sm text-subtle" aria-live="polite">Showing <span className="font-medium text-ink">{explore.visibleCountries.length}</span> of <span className="font-medium text-ink">{explore.totalResults}</span> countries</p><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{explore.visibleCountries.map((country) => <CountryCard key={country.code} country={country} showPopulation showFavourite />)}</div><Pagination currentPage={explore.page} totalPages={explore.totalPages} onPageChange={explore.changePage} /></>}</div></div>;
}
