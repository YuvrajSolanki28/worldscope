import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { historyData } from './historyData.js';
import { History } from '../models/History.js';

if (!await connectDatabase()) { console.error('MONGODB_URI is required to seed history data.'); process.exitCode = 1; }
else {
  for (const item of historyData) { const record = { ...item }; delete record.updatedAt; await History.findOneAndUpdate({ countryCode: record.countryCode }, record, { upsert: true, runValidators: true }); }
  console.log(`Seeded ${historyData.length} country history records.`); await mongoose.disconnect();
}
