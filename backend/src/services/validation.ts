import * as v from "valibot";

const messages = {
    string: "Dato inválido: debe ser string",
    stringId: "El DNI debe ser de tipo string",
    nonEmpty: "Uno o más campos no están definidos",
    minLength: "La longitud del id de string debe ser de 8 caracteres exactamente",
    minNumberLength: "El número ingresado no debe ser menor a 0",
    length: "debe tener longitud de 8 caracteres",
    number: "Dato inválido: debe ser un número",
    integer: "Dato inválido: debe ser un número entero",
    numberId: "El ID debe ser de tipo número",
    integerId: "El ID debe ser un número entero",
    nonNumberCharacter: "El string enviado solo debe contener números",
    invalidRole: "El rol ingresado no es válido",
    maxRatingExceeded: "El valor de rating no debe ser mayor a 5"
}

export function validateBody(body: object) {
    if (!body || Object.keys(body).length === 0) return false;

    return true;
}

function validateNumericString(str: string): boolean {
    const validCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    for (const char of str) {
        if (!validCharacters.includes(char)) return false;
    }

    return true;
}

export function validateNumberId(id: unknown) {
    const numberIdSchema = v.pipe(v.number(messages.numberId), v.integer(messages.integerId), v.minValue(1, messages.minNumberLength));

    return v.parse(numberIdSchema, id);
}

const minPasswordLength = 8;

const userSchema = v.object({
    email: v.pipe(
        v.string(messages.string),
        v.email(),
        v.nonEmpty(messages.nonEmpty)
    ),
    password: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.minLength(minPasswordLength)
    )
});

export function validateUserData(userData: unknown) {
    type userData = v.InferOutput<typeof userSchema>;

    return v.parse(userSchema, userData);
}

const clientSchema = v.object({
    business_name: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
    ),
    phone_number: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.check(validateNumericString, messages.nonNumberCharacter)
    )
});

export function validateClientData(clientData: unknown) {
    type clientData = v.InferOutput<typeof clientSchema>;

    return v.parse(clientSchema, clientData);
}

const productSchema = v.object({
    name: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty)
    ),
    price: v.pipe(
        v.number()
    )
})

export function validateProductData(productData: unknown) {
    type productData = v.InferOutput<typeof productSchema>;

    return v.parse(productSchema, productData);
}
