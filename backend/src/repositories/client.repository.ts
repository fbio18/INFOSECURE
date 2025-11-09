import AppDataSource from "../db";
import Client, { Receptor_type } from "../entities/Client";
import User from "../entities/User";
import { readCartService } from "../services/cart.services";
import { MissingData, NotFound } from "../services/errorMessages";
import { readInvoiceService } from "../services/invoice.services";
import { assignClientRelationService, readUserService } from "../services/user.services";
import { ClientValidated } from "../services/validation";
import CartRepository from "./cart.repository";
import NationalityRepository from "./nationality.repository";

const ClientRepository = AppDataSource.getRepository(Client).extend({
    async createClient(clientData: ClientValidated) {
        const user = await readUserService(clientData.user);
        const nationality = await NationalityRepository.readNationality(clientData.nationality);

        const newClient = await this
        .createQueryBuilder("client")
        .insert()
        .values({
            business_name: clientData.business_name,
            phone_number: clientData.phone_number,
            receptor_type: clientData.receptor_type as Receptor_type,
            nationality: nationality
        })
        .execute();

//        await this
//        .createQueryBuilder("client")
//        .relation(User, "client")
//        .of(user)
//        .add(newClient);

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

        if (!client) throw new NotFound("client");

        return client;
    },

    async readAllClients(): Promise<Client[]> {
        const client = await this
        .createQueryBuilder("client")
        .leftJoinAndSelect("client.carts", "carts")
        .leftJoinAndSelect("client.nationality", "nationalities")
        .leftJoinAndSelect("client.invoices", "invoices")
        .leftJoinAndSelect("client.user", "user")
        .getMany();

        if (!client) throw new NotFound("client");

        return client;
    },

    async updateClient(clientId: number, clientData: Partial<Client>): Promise<Client> {
        await this
        .createQueryBuilder()
        .update()
        .set(clientData)
        .where({ client_id: clientId })
        .execute();

        const updatedClient = await this.readClient(clientId);

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

        await this
        .createQueryBuilder("cart")
        .relation(Client, "carts")
        .of(client)
        .set(cart);
    },

    async addInvoice(clientId: number, invoiceId: number): Promise<void> {
        const invoice = await readInvoiceService(invoiceId);

        const client = await this.readClient(clientId);

        if (!client.invoices) client.invoices = [];

        client.invoices.push(invoice);
    }
})

export default ClientRepository;
