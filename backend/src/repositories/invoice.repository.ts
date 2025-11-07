import AppDataSource from "../db";
import Invoice, { TInvoice_type } from "../entities/Invoice";
import { readClientService } from "../services/client.services";
import { NotFound } from "../services/errorMessages";
import { InvoiceValidated } from "../services/validation";
import ClientRepository from "./client.repository";

const InvoiceRepository = AppDataSource.getRepository(Invoice).extend({
    async createInvoice(invoiceData: InvoiceValidated) {
        const client = await readClientService(invoiceData.client);

        await this
        .createQueryBuilder("invoice")
        .insert()
        .values({
            total_amount: invoiceData.total_amount,
            invoice_type: invoiceData.invoice_type as TInvoice_type,
            client: client
        })
        .execute();

        const returnedInvoice = await this
        .createQueryBuilder("invoice")
        .orderBy("invoice.order_number", "DESC")
        .getOne();

        if (!returnedInvoice) throw new Error();

        await ClientRepository.addInvoice(invoiceData.client, returnedInvoice.order_number);

        return returnedInvoice;
    },

    async readInvoice(invoiceId: number) {
        const invoice = await this
        .createQueryBuilder("invoice")
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("invoice.products", "products")
        .where("invoice.order_number= :invoiceId", { invoiceId })
        .getOne();

        if (!invoice) throw new NotFound("invoice");

        return invoice;
    },

    async readAllInvoices() {
        const invoices = await this
        .createQueryBuilder()
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("invoice.products", "products")
        .getMany();

        if (!invoices) throw new NotFound("invoice");

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
        .where("invoice.order_number= :invoiceId", { invoiceId })
        .execute();
    }
})

export default InvoiceRepository;
