import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  countriesApiKey: process.env.REST_COUNTRIES_API_KEY || '',
  mongoUri: process.env.MONGODB_URI || '',
  cacheTtl: Number(process.env.CACHE_TTL_MS) || 3_600_000,
};
