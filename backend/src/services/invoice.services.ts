import Invoice from "../entities/Invoice";
import InvoiceRepository from "../repositories/invoice.repository";
import { InvalidData, InvalidId } from "./errorMessages";
import { validateUpdateInvoiceData } from "./update-validation";
import { validateInvoiceData, validateNumberId } from "./validation";

export async function createInvoiceService(invoiceData: Partial<Invoice>) {
    const validatedData = validateInvoiceData(invoiceData);

    return await InvoiceRepository.createInvoice(validatedData);
}

export async function readInvoiceService(invoiceId: number): Promise<Invoice> {
    if (!validateNumberId(invoiceId)) throw new InvalidId("number");

    return await InvoiceRepository.readInvoice(invoiceId);
}

export async function readAllInvoicesService(): Promise<Invoice[]> {
    return await InvoiceRepository.readAllInvoices();
}

export async function updateInvoiceService(invoiceId: number, updatedInvoiceData: Partial<Invoice>): Promise<Invoice> {
    if (!validateNumberId(invoiceId)) throw new InvalidId();

    if(!validateUpdateInvoiceData(updatedInvoiceData)) throw new InvalidData();

    return await InvoiceRepository.updateInvoice(invoiceId, updatedInvoiceData);
}

export async function deleteInvoiceService(invoiceId: number) {
    await InvoiceRepository.deleteInvoice(invoiceId);
}
