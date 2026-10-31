import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { HistoryTimeline } from '../components/HistoryTimeline';
import { api } from '../services/api';
import type { Country, CountryHistory as HistoryType } from '../types/country';
import { flagUrl } from '../utils/format';

export function CountryHistory() {
  const { code = '' } = useParams(); const [country, setCountry] = useState<Country | null>(null); const [history, setHistory] = useState<HistoryType | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [missing, setMissing] = useState(false);
  useEffect(() => { const controller = new AbortController(); setLoading(true); Promise.all([api.country(code, controller.signal), api.history(code, controller.signal)]).then(([nextCountry, nextHistory]) => { setCountry(nextCountry); setHistory(nextHistory); }).catch((caught) => { if ((caught as Error).name !== 'AbortError') { const message = (caught as Error).message; if (message.toLowerCase().includes('coming soon')) setMissing(true); else setError(message); } }).finally(() => setLoading(false)); return () => controller.abort(); }, [code]);
  if (loading) return <div className="page-container py-12"><LoadingSpinner message="Loading country history…" /></div>;
  if (error) return <div className="page-container py-12"><ErrorMessage title="Could not load history" message={error} /></div>;
  if (missing || !history || !country) return <div className="page-container py-12"><EmptyState icon={<BookOpen className="h-6 w-6" />} title="History information is not available for this country yet." message="WorldScope only publishes reviewed timelines with traceable sources."><Link to={`/country/${code}`} className="btn btn-secondary">Back to details</Link><Link to="/explore" className="btn btn-primary">Explore Countries</Link></EmptyState></div>;
  return <div className="page-fade-in mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 md:py-10"><Link to={`/country/${country.code}`} className="btn btn-ghost -ml-3"><ArrowLeft className="h-4 w-4" />Back to {country.name}</Link><header className="mt-4 flex items-center gap-4"><img src={flagUrl(country, 320)} alt={country.flagAlt || `Flag of ${country.name}`} className="h-14 w-20 shrink-0 rounded-lg border border-line object-cover shadow-sm sm:h-16 sm:w-24" /><div><p className="text-sm font-medium text-brand">Country History</p><h1 className="text-3xl font-bold tracking-tight text-ink">History of {country.name}</h1></div></header><section className="card mt-8 p-5 sm:p-6"><h2 className="font-semibold text-ink">Introduction</h2><p className="mt-2 leading-relaxed text-subtle">{history.overview}</p></section><section className="mt-10"><h2 className="mb-6 text-xl font-bold text-ink">Important historical events</h2><HistoryTimeline events={history.events} /></section><section className="card mt-10 p-5 sm:p-6"><h2 className="font-semibold text-ink">Sources</h2><p className="mt-1 text-sm text-subtle">Summaries are simplified for learning. Read more from these references:</p><ul className="mt-3 space-y-2">{history.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">{source.label}<ExternalLink className="h-3.5 w-3.5" /></a></li>)}</ul></section></div>;
}
