import type { NextFunction, Request, Response } from 'express';
import { DrinkNotFoundError } from '../errors/DrinkNotFoundError.ts';
import { DrinkOnMenuError } from '../errors/DrinkOnMenuError.ts';
import { Drink } from '../models/Drink.ts';

/*

DIESE DATEI IST DIE AKTUELLE IN DER WIR EXPRESS MIDDLEWARE ZUM ERROR HANDLING NUTZEN

*/

export async function listDrinks(_req: Request, res: Response, next: NextFunction) {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
    } catch (error) {
        next(error);
    }
}

export async function getDrink(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const id = req.params.id;
        const drink = await Drink.findById(id);

        if (!drink) {
            throw new DrinkNotFoundError();
        }

        res.json(drink);
    } catch (error) {
        next(error);
    }
}

export async function addDrink(req: Request, res: Response, next: NextFunction) {
    try {
        const drink = await Drink.create({ name: req.body?.name });

        res.location('/drinks/' + drink._id.toString());
        res.status(201).json(drink);
    } catch (error) {
        next(error);
    }
}

export async function updateDrinkMenu(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const onMenu = req.body?.onMenu;

        if (typeof onMenu !== 'boolean') {
            res.status(400).json({ message: 'onMenu muss true oder false sein.' });
            return;
        }

        const drink = await Drink.findByIdAndUpdate(
            req.params.id,
            { $set: { onMenu } },
            { returnDocument: 'after' },
        );

        if (!drink) {
            throw new DrinkNotFoundError();
        }

        res.json(drink);
    } catch (error) {
        next(error);
    }
}

export async function deleteDrink(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
) {
    try {
        const id = req.params.id;
        const result = await Drink.deleteOne({ _id: id, onMenu: { $ne: true } });

        if (result.deletedCount === 0) {
            const drinkExists = await Drink.exists({ _id: id });

            if (drinkExists) {
                throw new DrinkOnMenuError();
            }
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
