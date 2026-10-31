import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Globe2, Menu, X } from 'lucide-react';
import { useFavourites } from '../contexts/FavouritesContext';

const navLinks = [
{ to: '/', label: 'Home' },
{ to: '/explore', label: 'Explore Countries' },
{ to: '/compare', label: 'Compare' },
{ to: '/favourites', label: 'Favourites' }];


export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favourites } = useFavourites();
  const location = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: {isActive: boolean;}) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
  isActive ? 'bg-brand-soft text-brand' : 'text-subtle hover:bg-slate-100 hover:text-ink'}`;


  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur-sm">
      <nav className="page-container flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <Globe2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">WorldScope</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
          <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
                {link.to === '/favourites' && favourites.length > 0 &&
              <span className="rounded-full bg-brand px-1.5 text-xs font-semibold text-white">{favourites.length}</span>
              }
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="btn btn-ghost px-2.5 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile links */}
      {menuOpen &&
      <div id="mobile-menu" className="menu-fade-in border-t border-line bg-white md:hidden">
          <ul className="page-container flex flex-col gap-1 py-3">
            {navLinks.map((link) =>
          <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={(state) => `${linkClass(state)} w-full py-3`}>
                  {link.label}
                  {link.to === '/favourites' && favourites.length > 0 &&
              <span className="rounded-full bg-brand px-1.5 text-xs font-semibold text-white">{favourites.length}</span>
              }
                </NavLink>
              </li>
          )}
          </ul>
        </div>
      }
    </header>);

}