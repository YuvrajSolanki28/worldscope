import { describe, expect, it } from 'vitest';
import { normalizeCountry } from './countryService';

describe('normalizeCountry', () => {
  it('normalizes the REST Countries v5 shape and missing optional values', () => {
    const country = normalizeCountry({ codes: { alpha_2: 'IN', alpha_3: 'IND' }, names: { common: 'India', official: 'Republic of India' }, capitals: [{ name: 'New Delhi', attributes: { primary: true } }], region: 'Asia', area: { kilometers: 3287263 }, population: 1400000000, flag: { url_svg: 'https://flags.example/in.svg', description: 'The flag of India' }, languages: [{ name: 'Hindi' }, { name: 'English' }], currencies: [{ name: 'Indian rupee' }], coordinates: { lat: 20, lng: 77 } });
    expect(country).toMatchObject({ code: 'IND', alpha2: 'IN', name: 'India', capital: 'New Delhi', area: 3287263, languages: ['Hindi', 'English'], coordinates: [20, 77] });
    expect(country.flag).toBe('https://flags.example/in.svg');
    expect(country.flagAlt).toBe('The flag of India');
  });
});
