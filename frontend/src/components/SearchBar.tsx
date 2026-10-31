import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search by country or capital…' }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="country-search" className="sr-only">Search countries</label>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
      <input
        id="country-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="form-control pl-9 pr-9" />
      
      {value &&
      <button
        type="button"
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-subtle hover:bg-slate-100 hover:text-ink"
        aria-label="Clear search">
        
          <X className="h-4 w-4" />
        </button>
      }
    </div>);

}