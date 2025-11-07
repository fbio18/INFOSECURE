import AppDataSource from "../db";
import Client, { Receptor_type } from "../entities/Client";
import { readCartService } from "../services/cart.services";
import { MissingData, NotFound } from "../services/errorMessages";
import { readInvoiceService } from "../services/invoice.services";
import { assignClientRelationService, readUserService } from "../services/user.services";
import { ClientValidated } from "../services/validation";
import NationalityRepository from "./nationality.repository";

const ClientRepository = AppDataSource.getRepository(Client).extend({
    async createClient(clientData: ClientValidated) {
        const user = await readUserService(clientData.user);
        const nationality = await NationalityRepository.readNationality(clientData.nationality);

        await this
        .createQueryBuilder("client")
        .insert()
        .values({
            business_name: clientData.business_name,
            phone_number: clientData.phone_number,
            receptor_type: clientData.receptor_type as Receptor_type,
            user: user,
            nationality: nationality
        })
        .execute();

        const returnedClient = await this
        .createQueryBuilder("client")
        .orderBy("client_id", "DESC")
        .getOne();

        if (!returnedClient) throw new NotFound("client");

        await assignClientRelationService(clientData.user, returnedClient.client_id);

        return returnedClient;
    },

    async readClient(clientId: number) {
        const client = await this
        .createQueryBuilder("client")
        .leftJoinAndSelect("client.carts", "carts")
        .leftJoinAndSelect("client.nationality", "nationalities")
        .leftJoinAndSelect("client.invoices", "invoices")
        .leftJoinAndSelect("client.user", "user")
        .where("client.client_id = :clientId", { clientId })
        .getOne();

        if (!client) throw new MissingData();

        return client;
    },

    async readAllClients(): Promise<Client[]> {
        const client = await this
        .createQueryBuilder()
        .leftJoinAndSelect("client.carts", "carts")
        .leftJoinAndSelect("client.nationality", "nationalities")
        .leftJoinAndSelect("client.invoices", "invoices")
        .leftJoinAndSelect("client.user", "user")
        .getMany();

        if (!client) throw new MissingData();

        return client;
    },

    async updateClient(clientId: number) {
        const updatedClient = await this
        .createQueryBuilder()
        .update()
        .set({})
        .where({ client_id: clientId })
        .execute();

        if (!updatedClient) throw new Error();

        return updatedClient;
    },

    async deleteClient(clientId: number) {
        await this
        .createQueryBuilder("client")
        .delete()
        .where("client.client_id", { clientId })
        .execute();
    },

    async assignCartRelation(clientId: number, cartId: number) {
        const cart = await readCartService(cartId);

        const client = await this.readClient(clientId);

        if (!client.carts) client.carts = [];

        client.carts.push(cart);

        await client.save();
    },

    async addInvoice(clientId: number, invoiceId: number): Promise<void> {
        const invoice = await readInvoiceService(invoiceId);

        const client = await this.readClient(clientId);

        if (!client.invoices) client.invoices = [];

        client.invoices.push(invoice);
    }
})

export default ClientRepository;
