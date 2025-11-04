import AppDataSource from "../db";
import Invoice from "../entities/Invoice";

const InvoiceRepository = AppDataSource.getRepository(Invoice).extend({
    async createInvoice(emitter: string, totalAmount: number) {
        await this
        .createQueryBuilder("invoice")
        .insert()
        .values({
            emitter: emitter,
            total_amount: totalAmount
        })
        .execute();

        const returnedInvoice = await this
        .createQueryBuilder("invoice")
        .orderBy("invoice.invoice_id", "DESC")
        .getOne();

        if (!returnedInvoice) throw new Error();

        return returnedInvoice;
    },

    async readInvoice(invoiceId: number) {
        const invoice = await this
        .createQueryBuilder("invoice")
        .where("invoice.invoice_id = :invoiceId", { invoiceId })
        .getOne();

        if (!invoice) throw new Error();

        return invoice;
    },

    async readAllInvoices() {
        const invoices = await this
        .createQueryBuilder()
        .getMany();

        if (!invoices) throw new Error();

        return invoices;
    },

    async updateInvoice() {
        const invoices = await this
        .createQueryBuilder()
        .getMany();

        if (!invoices) throw new Error();

        return invoices;
    },

    async deleteInvoice(invoiceId: number) {
        await this
        .createQueryBuilder("invoice")
        .delete()
        .where("invoice.invoice_id = :invoiceId", { invoiceId })
        .execute();
    }
})

export default InvoiceRepository;
