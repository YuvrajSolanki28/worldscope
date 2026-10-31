import React from 'react';
import { SelectField } from './SelectField';
import { SortOption } from '../types/country';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: {value: SortOption;label: string;}[] = [
{ value: 'name-asc', label: 'Name (A–Z)' },
{ value: 'name-desc', label: 'Name (Z–A)' },
{ value: 'population-desc', label: 'Population (high–low)' },
{ value: 'population-asc', label: 'Population (low–high)' },
{ value: 'area-desc', label: 'Area (largest first)' }];


export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <SelectField
      id="sort-select"
      label="Sort countries"
      hideLabel
      value={value}
      options={sortOptions}
      onChange={(newValue) => onChange(newValue as SortOption)} />);


}