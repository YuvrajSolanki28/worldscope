import mongoose from 'mongoose';

const sourceSchema = new mongoose.Schema({ label: { type: String, required: true, trim: true }, url: { type: String, required: true, match: /^https:\/\// } }, { _id: false });
const eventSchema = new mongoose.Schema({ id: { type: String, required: true }, year: { type: String, required: true }, title: { type: String, required: true, trim: true }, description: { type: String, required: true, trim: true }, sources: { type: [sourceSchema], validate: [(value) => value.length > 0, 'Every event requires a source.'] } }, { _id: false });
const historySchema = new mongoose.Schema({ countryCode: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true }, countryName: { type: String, required: true, trim: true }, overview: { type: String, required: true, trim: true }, events: { type: [eventSchema], validate: [(value) => value.length > 0, 'At least one event is required.'] }, sources: [sourceSchema] }, { timestamps: true });

export const History = mongoose.model('History', historySchema);
