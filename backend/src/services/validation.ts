import * as v from "valibot";

export const messages = {
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
    maxRatingExceeded: "El valor de rating no debe ser mayor a 5",
    invalidReceptorType: "El tipo de receptor enviado no es válido",
    invalidInvoiceType: "El tipo de factura enviado no es válido",
    minIdValue: "El valor del ID no debe ser menor a 1"
}

export function validateBody(body: object) {
    if (!body || Object.keys(body).length === 0) return false;

    return true;
}

export function validateNumericString(str: string): boolean {
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

export const MINPASSWORDLENGTH = 8;

const userSchema = v.object({
    email: v.pipe(
        v.string(messages.string),
        v.email(),
        v.nonEmpty(messages.nonEmpty)
    ),
    password: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.minLength(MINPASSWORDLENGTH)
    ),
    username: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
    )
});


export type UserValidated = v.InferOutput<typeof userSchema>;

export function validateUserData(userData: unknown) {
    return v.parse(userSchema, userData);
}

function validateReceptorType(receptorType: string): boolean {
    const allowedReceptorTypes = ["consumidor-final", "monotributista", "responsable-inscripto", "exportacion", "turista-extranjero"];

    if (!allowedReceptorTypes.includes(receptorType)) return false;

    return true;
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
    ),
    receptor_type: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.check(validateReceptorType, messages.invalidReceptorType)
    ),
    nationality: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    ),
    user: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    )
});


export type ClientValidated = v.InferOutput<typeof clientSchema>;

export function validateClientData(clientData: unknown) {
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

export type ProductValidated = v.InferOutput<typeof productSchema>;

export function validateProductData(productData: unknown) {
    return v.parse(productSchema, productData);
}

export const MIN_SALARY = 317800;
const employeeSchema = v.object({
    dni: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.length(8)
    ),
    names: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
    ),
    surnames: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
    ),
    salary: v.pipe(
        v.number(messages.number),
        v.minValue(MIN_SALARY, `El valor del salario no puede ser menor a ${MIN_SALARY}`)
    ),
    user: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    ),
    role: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    )
});

export type EmployeeValidated = v.InferOutput<typeof employeeSchema>;

export function validateEmployeeData(employeeData: unknown) {
    return v.parse(employeeSchema, employeeData);
}

const cartSchema = v.object({
    client: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    )
})

export type CartValidated = v.InferOutput<typeof cartSchema>;

export function validateCartData(cartData: unknown) {
    return v.parse(cartSchema, cartData);
}

export function validateInvoiceType(receptorType: string): boolean {
    const validReceptorTypes = ["A", "B", "C", "E", "M", "T"];

    if (!validReceptorTypes.includes(receptorType)) return false;

    return true;
}

const invoiceSchema = v.object({
    clientId: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    ),
    total_amount: 
        v.pipe(
            v.number(messages.number),
    ),
    invoice_type: v.pipe(
        v.string(messages.string),
        v.nonEmpty(messages.nonEmpty),
        v.length(1),
        v.check(validateInvoiceType, messages.invalidInvoiceType)
    ),
    cartId: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1, messages.minIdValue)
    )
});

export type InvoiceValidated = v.InferOutput<typeof invoiceSchema>

export function validateInvoiceData(invoiceData: unknown) {
    return v.parse(invoiceSchema, invoiceData);
}

const itemSchema = v.object({
    quantity: v.pipe(
        v.number(messages.number),
        v.integer(messages.integer),
        v.minValue(1)
    )
})

export type ItemValidated = v.InferOutput<typeof itemSchema>;

export function validateItemData(itemData: unknown) {
    return v.parse(itemSchema, itemData);
}
