export type Region = 'Asia' | 'Europe' | 'Africa' | 'Americas' | 'Oceania';
export interface Country {
  code: string; alpha2: string; name: string; officialName: string; capital: string; region: string; subregion: string;
  population: number; area: number; flag: string; flagAlt: string; languages: string[]; currencies: string[]; timezones: string[]; borders: string[];
  maps?: { google?: string; openStreet?: string }; coordinates?: number[]; continents?: string[]; independent?: boolean | null;
}
export interface HistorySource { label: string; url: string; }
export interface HistoryEvent { id: string; year: string; title: string; description: string; sources: HistorySource[]; }
export interface CountryHistory { countryCode: string; countryName: string; overview: string; events: HistoryEvent[]; sources: HistorySource[]; updatedAt: string; }
export interface RegionInfo { name: Region; description: string; }
export type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc' | 'area-desc';
