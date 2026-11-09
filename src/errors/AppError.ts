/*

DAS IST NUR EIN ANSCHAUUNGS CODE SNIPPET DER EINE KOMPLEXERE ERROR STRUKTUR ZEIGEN SOLL
WIE SIE AUCH EVENTUELL IN PRODUKTIONSUMGEBUNGEN AUSSEHEN KÖNNTE
ALSO DIESE DATEI IST AUCH NICHT ANGEBUNDEN

*/

export class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;

    constructor(
        message: string,
        statusCode: number,
        code: string,
        cause?: Error
    ) {
        super(message, { cause });

        this.name = new.target.name;
        this.statusCode = statusCode;
        this.code = code;
    }
}