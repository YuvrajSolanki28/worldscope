import { Router } from 'express';
import { compareCountries, listCountries, regions, showCountry } from '../controllers/countryController.js';

export const countryRouter = Router();
countryRouter.get('/', listCountries);
countryRouter.get('/compare', compareCountries);
countryRouter.get('/:code', showCountry);
export const regionRouter = Router().get('/', regions);
