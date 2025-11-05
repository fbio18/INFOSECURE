function addErrorMessage(errorType: string): { message: string, statusCode: number } {
    switch (errorType) {
        case "invalid-id":
            return { message: "Por favor ingrese un id válido", statusCode: 400 };

        case "invalid-number-id":
            return { message: "Error de id numérico no válido", statusCode: 400 };

        case "invalid-string-id":
            return { message: "Error de id string no válido", statusCode: 400 };

        case "not-found":
            return { message: "El objeto solicitado no existe", statusCode: 404 };
        
        case "access-denied":
            return { message: "Acceso denegado. Por favor inicie sesión", statusCode: 401 };

        case "access-unauthorized":
            return { message: "Acceso no autorizado", statusCode: 401 };
            
        case "empty-body":
            return { message: "Al cuerpo de la petición le faltan uno o más datos", statusCode: 400 };

        case "already-exists":
            return { message: "El objeto que está intentando crear ya existe", statusCode: 409 };

        case "query-builder-error":
            return { message: "Hubo un error al ejecutar un query builder", statusCode: 500 };
        
        case "invalid-data":
            return { message: "Los datos presentan una forma inválida", statusCode: 400 };

        default:
            return { message: errorType, statusCode: 500 }; // 500 para indicar que no se sabe qué codigo es
    }
}

export class CustomError extends Error {
    constructor(public errorCode: string, public statusCode: number) {

        if (statusCode) {
            if (statusCode < 100 || statusCode > 600) {
                throw new Error("El atributo statusCode de la clase CustomError debe estar en el valor [100, 599]")
            }
        }

        super();

        const error = addErrorMessage(errorCode);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.name = "CustomError";
        this.message = error.message;
        this.statusCode = error.statusCode === statusCode ? error.statusCode : statusCode;
    }
}

export class NotFound extends Error {
    constructor(
        public entity: "user" | "invoice" | "client" | "product" | "cart" | "role" | "employee",
        private statusCode?: number
    ) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "NotFound"
        this.message = `El dato ${entity} no fue encontrado`;
        this.statusCode = 404;
    }
}

export class InvalidId extends Error {
    constructor(public idType: "number" | "string", private statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "InvalidId";
        this.message = `La id de tipo ${idType} utilizada no es válida`;
        this.statusCode = 400;
    }
}

export class InvalidBody extends Error {
    constructor(private statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "InvalidBody";
        this.message = "El body está vacío o no cumple con los datos necesarios";
        this.statusCode = 400;
    }
}


export class InvalidData extends Error {
    constructor(private statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "InvalidData";
        this.message = "El formato de los datos es incorrecto";
        this.statusCode = 400;
    }
}

export class MissingData extends Error {
    constructor(private statusCode?: number) {
        super();

        if (Error.captureStackTrace) Error.captureStackTrace(this, NotFound);

        this.name = "MissingData";
        this.message = "Faltan uno o más campos";
        this.statusCode = 400;
    }
}
