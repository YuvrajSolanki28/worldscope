import { Router } from 'express';
import { showHistory } from '../controllers/historyController.js';
export const historyRouter = Router().get('/:code', showHistory);
