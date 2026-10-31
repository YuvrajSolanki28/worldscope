import React from 'react';
import { Heart } from 'lucide-react';
import { useFavourites } from '../contexts/FavouritesContext';

interface FavouriteButtonProps {
  countryCode: string;
  countryName: string;
  variant?: 'icon' | 'full';
}

export function FavouriteButton({ countryCode, countryName, variant = 'icon' }: FavouriteButtonProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(countryCode);
  const label = saved ? `Remove ${countryName} from favourites` : `Add ${countryName} to favourites`;

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={() => toggleFavourite(countryCode)}
        aria-pressed={saved}
        className={`btn ${saved ? 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100' : 'btn-primary'}`}>
        
        <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} aria-hidden="true" />
        {saved ? 'Saved to Favourites' : 'Add to Favourites'}
      </button>);

  }

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(countryCode)}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white shadow-sm transition-colors duration-200 hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
      
      <Heart className={`h-4 w-4 transition-colors duration-200 ${saved ? 'fill-red-500 text-red-500' : 'text-subtle'}`} aria-hidden="true" />
    </button>);

}