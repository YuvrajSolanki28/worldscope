import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeftRight, GitCompare, RotateCcw } from 'lucide-react';
import { CompareTable } from '../components/CompareTable';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SampleDataNotice } from '../components/SampleDataNotice';
import { SelectField } from '../components/SelectField';
import { useCountries } from '../hooks/useCountries';

export function Compare() {
  const data = useCountries(); const [params] = useSearchParams();
  const [firstCode, setFirstCode] = useState(params.get('a') || params.get('first') || ''); const [secondCode, setSecondCode] = useState(params.get('b') || params.get('second') || '');
  const [compared, setCompared] = useState<{ first: string; second: string } | null>(null); const [error, setError] = useState('');
  useEffect(() => { if (data.countries.length && !firstCode && !secondCode) { setFirstCode('IND'); setSecondCode('JPN'); } }, [data.countries.length, firstCode, secondCode]);
  const options = [...data.countries].sort((a, b) => a.name.localeCompare(b.name)).map((country) => ({ value: country.code, label: country.name }));
  const compare = () => { if (!firstCode || !secondCode) return setError('Please select two countries to compare.'); if (firstCode === secondCode) return setError('Please choose two different countries.'); setError(''); setCompared({ first: firstCode, second: secondCode }); };
  const first = data.countries.find((country) => country.code === compared?.first); const second = data.countries.find((country) => country.code === compared?.second);
  if (data.loading) return <div className="page-container py-12"><LoadingSpinner /></div>;
  if (data.error) return <div className="page-container py-12"><ErrorMessage message={data.error} onRetry={data.retry} /></div>;
  return <div className="page-fade-in page-container py-10 md:py-12"><header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-3xl font-bold tracking-tight text-ink">Compare Countries</h1><p className="mt-2 max-w-xl text-subtle">Choose two countries to see their real facts side by side.</p></div><SampleDataNotice /></header><div className="card mt-8 p-4 sm:p-5"><div className="grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]"><SelectField id="first-country" label="First country" value={firstCode} options={options} onChange={setFirstCode} placeholder="Select a country" /><button type="button" onClick={() => { setFirstCode(secondCode); setSecondCode(firstCode); }} className="btn btn-secondary h-11 justify-self-center px-3" aria-label="Swap countries"><ArrowLeftRight className="h-4 w-4 rotate-90 md:rotate-0" /><span className="md:hidden">Swap</span></button><SelectField id="second-country" label="Second country" value={secondCode} options={options} onChange={setSecondCode} placeholder="Select a country" /></div>{error && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{error}</p>}<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => { setFirstCode(''); setSecondCode(''); setCompared(null); setError(''); }} className="btn btn-ghost"><RotateCcw className="h-4 w-4" />Reset</button><button type="button" onClick={compare} className="btn btn-primary sm:px-6"><GitCompare className="h-4 w-4" />Compare</button></div></div><div className="mt-8">{first && second ? <CompareTable first={first} second={second} /> : <EmptyState icon={<GitCompare className="h-6 w-6" />} title="Nothing to compare yet" message="Select two countries above and press Compare to see them side by side." />}</div></div>;
}
