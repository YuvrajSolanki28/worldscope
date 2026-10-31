import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from './api';

afterEach(() => vi.unstubAllGlobals());

describe('api service', () => {
  it('unwraps successful country responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, data: [{ code: 'IND', name: 'India' }] }) }));
    await expect(api.countries()).resolves.toEqual([{ code: 'IND', name: 'India' }]);
  });

  it('surfaces the backend error message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: 'Provider unavailable' }) }));
    await expect(api.countries()).rejects.toThrow('Provider unavailable');
  });
});
