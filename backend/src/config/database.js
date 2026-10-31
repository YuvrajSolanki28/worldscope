import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  if (!env.mongoUri) { console.warn('MongoDB is not configured; using curated JSON history fallback.'); return false; }
  try { await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 }); console.log('MongoDB connected.'); return true; }
  catch (error) { console.warn(`MongoDB unavailable; using JSON history fallback: ${error.message}`); return false; }
}
