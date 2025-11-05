import AppDataSource from "../db";
import Client from "../entities/Client";
import { MissingData, NotFound } from "../services/errorMessages";

const ClientRepository = AppDataSource.getRepository(Client).extend({
    async createClient(clientData: Partial<Client>) {
        if (!clientData.business_name || !clientData.phone_number) throw new MissingData();

        await this
        .createQueryBuilder("client")
        .insert()
        .values({
            business_name: clientData.business_name,
            phone_number: clientData.phone_number
        })
        .execute();

        const returnedClient = await this
        .createQueryBuilder("client")
        .orderBy("client_id", "DESC")
        .getOne();

        if (!returnedClient) throw new NotFound("client");

        return returnedClient;
    },

    async readClient(clientId: number) {
        const client = await this
        .createQueryBuilder("client")
        .where("client.client_id = :clientId", { clientId })
        .getOne();

        if (!client) throw new Error();

        return client;
    },

    async readAllClients(): Promise<Client[]> {
        const client = await this
        .createQueryBuilder()
        .getMany();

        if (!client) throw new Error();

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
    }
})

export default ClientRepository;
