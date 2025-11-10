import * as v from "valibot";
import { messages, MIN_SALARY, MINPASSWORDLENGTH, validateInvoiceType, validateNumericString } from "./validation";

const updateUserSchema = v.object({
    email: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.email(),
            v.nonEmpty(messages.nonEmpty),
    )),
    password: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
            v.minLength(MINPASSWORDLENGTH)
        )),
    username: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
    ))
});
export type UpdateUserValidated = v.InferOutput<typeof updateUserSchema>;
export function validateUpdateUserData(userData: unknown) {
    return v.parse(updateUserSchema, userData);
}

const updateClientSchema = v.object({
    business_name: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
    )),
    phone_number: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
            v.check(validateNumericString, messages.nonNumberCharacter)
    )),
    receptor_type: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
            v.length(1),
    )),
    nationality: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
    )),
    user: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
    ))
});

export function validateUpdateClientData(userData: unknown) {
    return v.parse(updateClientSchema, userData);
}


const MIN_PRODUCT_PRICE = 10000;
const updateProductSchema = v.object({
    name: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty)
    )),
    price: v.nullish(
        v.pipe(
            v.number(),
            v.minValue(MIN_PRODUCT_PRICE)
    ))
})

export function validateUpdatedProductData(productData: unknown) {
    return v.parse(updateProductSchema, productData);
}

const updatedEmployeeSchema = v.object({
    dni: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
            v.length(8)
    )),
    names: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
    )),
    surnames: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
    )),
    salary: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.minValue(MIN_SALARY, `El valor del salario no puede ser menor a ${MIN_SALARY}`)
    )),
    user: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
    )),
    is_in_license: v.nullish(
        v.boolean()
    )
});

export function validateUpdateEmployeeData(employeeData: unknown) {
    return v.parse(updatedEmployeeSchema, employeeData);
}

const updateCartSchema = v.object({
    client: v.nullish(
        v.pipe(
            v.number(),
            v.integer(),
            v.minValue(1)
        )
    )
})

export function validateUpdateCartData(cartData: unknown) {
    return v.parse(updateCartSchema, cartData);
}

const invoiceSchema = v.object({
    emitter: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
    )),
    client: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
    )),
    total_amount: v.nullish(
        v.pipe(
            v.number(messages.number),
    )),
    invoice_type: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.nonEmpty(messages.nonEmpty),
            v.length(1),
            v.check(validateInvoiceType, messages.invalidInvoiceType)
    ))
});

export function validateUpdateInvoiceData(invoiceData: unknown) {
    return v.parse(invoiceSchema, invoiceData);
}
