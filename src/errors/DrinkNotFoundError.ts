export class DrinkNotFoundError extends Error {
    constructor() {
        super('Drink nicht gefunden.');
    }
}

// Würde man AppError aus AppError.ts nutzen, würde die Class so aussehen:

/*
export class DrinkNotFoundError extends AppError {
    constructor() {
        super(
            'Drink nicht gefunden.',
            404,
            'DRINK_NOT_FOUND'
        );
    }
}
*/

// So könnte eine Response auf diesen Fehler aussehen:

/*
{
  "error": {
    "code": "DRINK_NOT_FOUND",
    "message": "Drink nicht gefunden."
  }
}
  */

// Generell müssten wir aber auch noch an 1-2 anderen Stellen Anpassungen vornehmen wenn
// wir AppError.ts nutzen wollen würden