import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortOption } from '../types/country';
import { useCountries } from './useCountries';

const COUNTRIES_PER_PAGE = 12;

export function useExploreCountries() {
  const data = useCountries();
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('region') ?? 'All';
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [sort, setSort] = useState<SortOption>('name-asc');
  const [page, setPage] = useState(1);

  useEffect(() => { setPage(1); }, [search, region, sort]);
  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.countries.filter((country) => (!query || country.name.toLowerCase().includes(query) || country.capital.toLowerCase().includes(query)) && (region === 'All' || country.region === region)).sort((a, b) => {
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      if (sort === 'population-desc') return b.population - a.population;
      if (sort === 'population-asc') return a.population - b.population;
      if (sort === 'area-desc') return b.area - a.area;
      return a.name.localeCompare(b.name);
    });
  }, [data.countries, search, region, sort]);
  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / COUNTRIES_PER_PAGE));
  const visibleCountries = filteredCountries.slice((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE);
  const setRegion = (value: string) => setSearchParams((current) => { if (value === 'All') current.delete('region'); else current.set('region', value); return current; });
  return { search, setSearch, region, setRegion, sort, setSort, page, changePage: (next: number) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); }, totalPages, status: data.loading ? 'loading' : data.error ? 'error' : 'ready', error: data.error, retry: data.retry, clearFilters: () => { setSearch(''); setRegion('All'); }, visibleCountries, totalResults: filteredCountries.length };
}
