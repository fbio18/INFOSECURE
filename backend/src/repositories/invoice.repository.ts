import AppDataSource from "../db";
import Invoice, { TInvoice_type } from "../entities/Invoice";
import { readClientService } from "../services/client.services";
import { NotFound } from "../services/errorMessages";
import { invoiceFilter } from "../services/filters-validation";
import { InvoiceValidated } from "../services/validation";
import CartRepository from "./cart.repository";
import ClientRepository from "./client.repository";

const InvoiceRepository = AppDataSource.getRepository(Invoice).extend({
    async createInvoice(invoiceData: InvoiceValidated) {
        const client = await readClientService(invoiceData.clientId);
        const cart = await CartRepository.readCart(invoiceData.cartId);

        await this
        .createQueryBuilder("invoice")
        .insert()
        .values({
            total_amount: invoiceData.total_amount,
            invoice_type: invoiceData.invoice_type as TInvoice_type,
        })
        .execute();

        const returnedInvoice = await this
        .createQueryBuilder("invoice")
        .orderBy("invoice.order_number", "DESC")
        .getOne();

        if (!returnedInvoice) throw new Error();

        await CartRepository.createReplacementCart(invoiceData.cartId, invoiceData.clientId);

        await this
        .createQueryBuilder()
        .relation(Invoice, "client")
        .of(returnedInvoice)
        .set(client);

        await this
        .createQueryBuilder()
        .relation(Invoice, "cart")
        .of(returnedInvoice)
        .set(cart);

        await ClientRepository.addInvoice(invoiceData.clientId, returnedInvoice.order_number);

        return await this.readInvoice(returnedInvoice.order_number);
    },

    async readInvoice(invoiceId: number) {
        const invoice = await this
        .createQueryBuilder("invoice")
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("invoice.cart", "cart")
        .where("invoice.order_number= :invoiceId", { invoiceId })
        .getOne();

        if (!invoice) throw new NotFound("invoice");

        return invoice;
    },

    async readAllInvoices() {
        const invoices = await this
        .createQueryBuilder()
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("invoice.cart", "cart")
        .getMany();

        if (!invoices) throw new NotFound("invoice");

        return invoices;
    },

    async readByClientId(clientId: number): Promise<Invoice[]> {
        const invoices = await this
        .createQueryBuilder("invoice")
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("invoice.cart", "cart")
        .where("client.client_id = :clientId", { clientId })
        .getMany();

        if (!invoices) throw new NotFound("invoice");

        return invoices;
    },

    async readByFilters(invoiceFilters: invoiceFilter): Promise<Invoice[]> {
        const query = this
        .createQueryBuilder("invoice")
        .leftJoinAndSelect("invoice.client", "client")
        .leftJoinAndSelect("client.nationality", "nationality")

        if (invoiceFilters.clientName) query.andWhere("client.business_name = :clientName", { clientName: invoiceFilters.clientName });

        if (invoiceFilters.emissionDate) query.andWhere("invoice.emission_date = :invoiceEmissionDate", { invoiceEmissionDate: invoiceFilters.emissionDate});

        if (invoiceFilters.invoice_type) query.andWhere("invoice.invoice_type = :invoiceInvoiceType", { invoiceInvoiceType: invoiceFilters.invoice_type });

        if (invoiceFilters.nationality) query.andWhere("nationality.nationality_id = :countryId", { countryId: invoiceFilters.nationality });

        if (invoiceFilters.total) query.andWhere("invoice.total_amount = :total", { total: invoiceFilters.total });

        const invoices = await query.getMany();
        if (!invoices) throw new NotFound("invoice");

        return invoices;
    },

    async updateInvoice(invoiceId: number, updatedInvoiceData: Partial<Invoice>): Promise<Invoice> {
        await this
        .createQueryBuilder()
        .update()
        .set(updatedInvoiceData)
        .where("user_id = :userId", { invoiceId })
        .execute();

        const updatedInvoice = await this.readInvoice(invoiceId);

        return updatedInvoice;
    },

    async deleteInvoice(invoiceId: number) {
        await this
        .createQueryBuilder("invoice")
        .delete()
        .where("invoice.order_number= :invoiceId", { invoiceId })
        .execute();
    },

    async deleteAllInvoicesFromClient(clientId: number): Promise<void> {
        const invoices = await this.readByClientId(clientId);

        for (const invoice of invoices) {
            await this
            .createQueryBuilder()
            .relation(Invoice, "client")
            .of(invoice)
            .set(null)

            await this
            .createQueryBuilder()
            .relation(Invoice, "cart")
            .of(invoice)
            .set(null);
        }

        await this
        .createQueryBuilder()
        .delete()
        .where("client.client_id = :clientId", { clientId })
        .execute();
    }
})

export default InvoiceRepository;
