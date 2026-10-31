import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Castle, Mountain, Sun, Trees, Waves } from 'lucide-react';
import { Region, RegionInfo } from '../types/country';

const regionIcons: Record<Region, React.ReactNode> = {
  Asia: <Mountain className="h-5 w-5" />,
  Europe: <Castle className="h-5 w-5" />,
  Africa: <Sun className="h-5 w-5" />,
  Americas: <Trees className="h-5 w-5" />,
  Oceania: <Waves className="h-5 w-5" />
};

interface RegionCardProps {
  region: RegionInfo;
  countryCount: number;
}

export function RegionCard({ region, countryCount }: RegionCardProps) {
  return (
    <Link
      to={`/explore?region=${region.name}`}
      className="card card-lift group flex flex-col p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
      
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand" aria-hidden="true">
        {regionIcons[region.name]}
      </span>
      <h3 className="mt-4 font-semibold text-ink">{region.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-subtle">{region.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
        {countryCount} countries
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>);

}