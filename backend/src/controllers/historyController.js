import mongoose from 'mongoose';
import { historyData } from '../data/historyData.js';
import { History } from '../models/History.js';
import { AppError } from '../utils/AppError.js';

export async function showHistory(req, res, next) {
  try {
    const code = String(req.params.code).trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(code)) throw new AppError('History requires a three-letter country code.', 400, 'INVALID_COUNTRY_CODE');
    const record = mongoose.connection.readyState === 1 ? await History.findOne({ countryCode: code }).lean() : historyData.find((item) => item.countryCode === code);
    if (!record) throw new AppError('Curated history coming soon for this country.', 404, 'HISTORY_NOT_FOUND');
    res.json({ success: true, data: record, message: 'History loaded.' });
  } catch (error) { next(error); }
}
