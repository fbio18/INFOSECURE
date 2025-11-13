import { messages, MIN_SALARY } from "./validation";
import * as v from "valibot";

const employeeFiltersSchema = v.object({
    role: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
        )
    ),
    minYearsWorking: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(0)
        )
    ),
    maxYearsWorking: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1)
        )
    ),
    minSalary: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.minValue(MIN_SALARY)
        )
    ),
    maxSalary: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.minValue(MIN_SALARY)
        )
    ),
    is_in_license: v.nullish(
        v.pipe(
            v.boolean()
        )
    )
})

export type employeeFilter = v.InferOutput<typeof employeeFiltersSchema>

export function validateEmployeeFilters(employeeFilters: unknown) {
    return v.parse(employeeFiltersSchema, employeeFilters);
}

const invoiceFilterSchema = v.object({
    clientName: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.trim(),
            v.nonEmpty(messages.nonEmpty)
        )
    ),
    total: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.minValue(1)
        )
    ),
    invoice_type: v.nullish(
        v.pipe(
            v.string(messages.string),
            v.trim(),
            v.nonEmpty(messages.nonEmpty),
            v.length(1)
        )
    ),
    emissionDate: v.nullish(
        v.pipe(
            v.date(),
        )
    ),
    nationality: v.nullish(
        v.pipe(
            v.number(messages.number),
            v.integer(messages.integer),
            v.minValue(1, messages.minIdValue)
        )
    )
})

export type invoiceFilter = v.InferOutput<typeof invoiceFilterSchema>;

export function validateInvoiceFilters(invoiceFilters: unknown) {
    return v.parse(invoiceFilterSchema, invoiceFilters);
}
