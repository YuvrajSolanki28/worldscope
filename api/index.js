import { app } from '../backend/src/app.js';
import { connectDatabase } from '../backend/src/config/database.js';

let databaseConnection;

export default async function handler(request, response) {
  databaseConnection ??= connectDatabase();
  await databaseConnection;
  return app(request, response);
}
