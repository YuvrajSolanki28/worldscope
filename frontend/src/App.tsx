import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { Compare } from './pages/Compare';
import { CountryDetails } from './pages/CountryDetails';
import { CountryHistory } from './pages/CountryHistory';
import { ExploreCountries } from './pages/ExploreCountries';
import { Favourites } from './pages/Favourites';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-page">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExploreCountries />} />
              <Route path="/countries" element={<ExploreCountries />} />
              <Route path="/country/:code" element={<CountryDetails />} />
              <Route path="/countries/:code" element={<CountryDetails />} />
              <Route path="/country/:code/history" element={<CountryHistory />} />
              <Route path="/history/:code" element={<CountryHistory />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FavouritesProvider>);

}
