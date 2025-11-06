import AppDataSource from "../db";
import Client from "../entities/Client";
import { MissingData, NotFound } from "../services/errorMessages";
import { assignClientRelationService, readUserService } from "../services/user.services";
import NationalityRepository from "./nationality.repository";

const ClientRepository = AppDataSource.getRepository(Client).extend({
    async createClient(clientData: Partial<Client>) {
        if (!clientData.business_name || !clientData.phone_number) throw new MissingData();

        const userId = clientData.user as unknown as number;
        const user = await readUserService(userId);
        const nationalityId = clientData.nationality as unknown as number;
        const nationality = await NationalityRepository.readNationality(nationalityId);

        await this
        .createQueryBuilder("client")
        .insert()
        .values({
            business_name: clientData.business_name,
            phone_number: clientData.phone_number,
            user: user,
            nationality: nationality
        })
        .execute();

        const returnedClient = await this
        .createQueryBuilder("client")
        .orderBy("client_id", "DESC")
        .getOne();

        if (!returnedClient) throw new NotFound("client");

        await assignClientRelationService(userId, returnedClient.client_id);

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
