export function createErrorResponse(error: any): { message: string, statusCode: number } {
    // No intercambiar el orden nombre de las condicionales. Sino el caso de ValiBot nunca entra
    // Aparentemente esto es porque instanceof toma en cuenta la herencia
    if (error.name === "ValiError") return { message: error.message, statusCode: 404 };

    if (!error.statusCode) return { message: error.message, statusCode: 500 };

    return { message: error.message, statusCode: error.statusCode };
}

export class CustomError extends Error {
    constructor(message: string, public statusCode: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);

        this.name = "CustomError";
        this.message = message;
        this.statusCode = statusCode;
    }
}

export class NotFound extends Error {
    constructor(
        public entity: "user" | "invoice" | "client" | "product" | "cart" | "role" | "employee" | "nationality" | "item",
        private _statusCode?: number
    ) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "NotFound"
        this.message = `El dato ${entity} no fue encontrado`;
        this._statusCode = 404;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class InvalidId extends Error {
    constructor(public idType: "number" | "string" = "number", private _statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidId);

        this.name = "InvalidId";
        this.message = `La id de tipo ${idType} utilizada no es válida`;
        this._statusCode = 400;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class InvalidBody extends Error {
    constructor(private _statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidBody);

        this.name = "InvalidBody";
        this.message = "El body está vacío o no cumple con los datos necesarios";
        this._statusCode = 400;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class InvalidData extends Error {
    constructor(private _statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, InvalidData);

        this.name = "InvalidData";
        this.message = "El formato de los datos es incorrecto";
        this._statusCode = 400;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class MissingData extends Error {
    constructor(private _statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, MissingData);

        this.name = "MissingData";
        this.message = "Faltan uno o más campos";
        this._statusCode = 400;
    }

    public get statusCode() {
        return this._statusCode;
    }
}

export class MissingQueryParameters extends Error {
    constructor(private _statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, MissingQueryParameters);

        this.name = "MissingQueryParameters";
        this.message = "Faltan parámetros de query";
        this._statusCode = 400;
    }

    public get statusCode() {
        return this._statusCode;
    }
}
