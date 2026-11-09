import type { Request, Response } from 'express';
import { Drink } from '../models/Drink.ts';

/*

DAS IST DER ALTE CODE OHNE ERROR HANDLING AUS UNSEREM VORHERIGEN BEISPIEL "MIDDLEWARE-GRUNDLAGEN"
DIE DATEI IST NICHT ANGEBUNDEN SIE DIENT NUR ALS ANSCHAUUNG

*/


export async function listDrinks(_req: Request, res: Response) {
    const drinks = await Drink.find();
    res.json(drinks);
}

export async function getDrink(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const drink = await Drink.findById(id);

    if (!drink) {
        res.status(404).send('Drink nicht gefunden.');
        return;
    }

    res.json(drink);
}

export async function addDrink(req: Request, res: Response) {
    const drink = await Drink.create({ name: req.body.name });

    res.location('/drinks/' + drink._id.toString());
    res.status(201).json(drink);
}

export async function deleteDrink(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    await Drink.findByIdAndDelete(id);
    res.status(204).end();
}
