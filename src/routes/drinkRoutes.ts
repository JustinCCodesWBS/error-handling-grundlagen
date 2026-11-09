import { Router } from 'express';
import {
    listDrinks,
    getDrink,
    addDrink,
    updateDrinkMenu,
    deleteDrink,
} from '../controllers/drinkControllerWithMiddleware.ts';
import { preventCaching } from '../middleware/preventCaching.ts';

export const drinkRoutes = Router();

drinkRoutes.use(preventCaching);

drinkRoutes.get('/', listDrinks);
drinkRoutes.get('/:id', getDrink);
drinkRoutes.post('/', addDrink);
drinkRoutes.patch('/:id/menu', updateDrinkMenu);
drinkRoutes.delete('/:id', deleteDrink);
