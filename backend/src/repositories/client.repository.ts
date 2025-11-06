import AppDataSource from "../db";
import Client from "../entities/Client";
import { readCartService } from "../services/cart.services";
import { NotFound } from "../services/errorMessages";
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
            receptor_type: clientData.receptor_type,
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
    },

    async assignCartRelation(clientId: number, cartId: number) {
        const cart = await readCartService(cartId);

        const client = await this.readClient(clientId);

        client.carts.push(cart);

        await client.save();
    }
})

export default ClientRepository;
