import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Country } from '../types/country';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true); setError('');
    try { setCountries(await api.countries(signal)); }
    catch (caught) { if ((caught as Error).name !== 'AbortError') setError((caught as Error).message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const controller = new AbortController(); void load(controller.signal); return () => controller.abort(); }, [load]);
  return { countries, loading, error, retry: () => void load() };
}
