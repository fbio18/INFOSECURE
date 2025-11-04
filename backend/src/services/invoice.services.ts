import Invoice from "../entities/Invoice";
import InvoiceRepository from "../repositories/invoice.repository";

export async function createInvoiceService() {
    return await InvoiceRepository.createInvoice();
}

export async function readInvoiceService(invoiceId: number): Promise<Invoice> {
    return await InvoiceRepository.readInvoice(invoiceId);
}

export async function readAllInvoicesService(): Promise<Invoice[]> {
    return await InvoiceRepository.readAllInvoices();
}

export async function updateInvoiceService() {
    await InvoiceRepository.updateInvoice();
}

export async function deleteInvoiceService(invoiceId: number) {
    await InvoiceRepository.deleteInvoice(invoiceId);
}
