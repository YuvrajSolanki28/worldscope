import React from 'react';
import { SelectField } from './SelectField';
import { regions } from '../data/regions';

interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  const options = [
  { value: 'All', label: 'All regions' },
  ...regions.map((region) => ({ value: region.name, label: region.name }))];


  return <SelectField id="region-filter" label="Filter by region" hideLabel value={value} options={options} onChange={onChange} />;
}