import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Drink } from '../models/Drink.ts';


/*

DAS HIER IST WIE NORMALES ERROR HANDLING AUSSEHEN KÖNNTE
DIE DATEI IST NICHT ANGEBUNDEN SIE DIENT NUR ALS ANSCHAUUNG

*/

export async function listDrinks(_req: Request, res: Response) {
    try {
        const drinks = await Drink.find();
        res.json(drinks);
    } catch {
        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
}

export async function getDrink(req: Request<{ id: string }>, res: Response) {
    try {
        const id = req.params.id;
        const drink = await Drink.findById(id);

        if (!drink) {
            res.status(404).send('Drink nicht gefunden.');
            return;
        }

        res.json(drink);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: 'Ungültige Drink-ID.' });
            return;
        }

        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
}

export async function addDrink(req: Request, res: Response) {
    try {
        const drink = await Drink.create({ name: req.body?.name });

        res.location('/drinks/' + drink._id.toString());
        res.status(201).json(drink);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: 'Ein gültiger Name ist erforderlich.' });
            return;
        }

        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
}

export async function deleteDrink(req: Request<{ id: string }>, res: Response) {
    try {
        const id = req.params.id;
        await Drink.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: 'Ungültige Drink-ID.' });
            return;
        }

        res.status(500).json({ message: 'Interner Serverfehler.' });
    }
}
