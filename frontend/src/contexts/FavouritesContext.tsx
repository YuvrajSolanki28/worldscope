/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavouritesContextValue {
  favourites: string[];
  isFavourite: (code: string) => boolean;
  toggleFavourite: (code: string) => void;
  removeFavourite: (code: string) => void;
}

const STORAGE_KEY = 'worldscope-favourites';

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

// Stores favourite country codes and saves them to localStorage
export function FavouritesProvider({ children }: {children: React.ReactNode;}) {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as string[] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {

      // localStorage may be unavailable (e.g. private mode) — ignore
    }}, [favourites]);

  const isFavourite = (code: string) => favourites.includes(code);

  const toggleFavourite = (code: string) => {
    setFavourites((current) =>
    current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
    );
  };

  const removeFavourite = (code: string) => {
    setFavourites((current) => current.filter((item) => item !== code));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>);

}

export function useFavourites(): FavouritesContextValue {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used inside FavouritesProvider');
  }
  return context;
}
