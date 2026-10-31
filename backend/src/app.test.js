import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from './app';

describe('WorldScope API', () => {
  it('reports health using the standard response envelope', async () => { const response = await request(app).get('/api/health'); expect(response.status).toBe(200); expect(response.body).toMatchObject({ success: true, data: { status: 'ok' } }); });
  it('validates compare selections before contacting the provider', async () => { const response = await request(app).get('/api/countries/compare?first=IND'); expect(response.status).toBe(400); expect(response.body.code).toBe('MISSING_COUNTRIES'); });
  it('serves curated history without MongoDB', async () => { const response = await request(app).get('/api/history/IND'); expect(response.status).toBe(200); expect(response.body.data.events.length).toBeGreaterThan(0); });
  it('returns a clear unsupported history state', async () => { const response = await request(app).get('/api/history/BRA'); expect(response.status).toBe(404); expect(response.body.code).toBe('HISTORY_NOT_FOUND'); });
});
