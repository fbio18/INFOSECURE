import * as v from "valibot";
import { messages, MINPASSWORDLENGTH, validateNumericString } from "./validation";

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
