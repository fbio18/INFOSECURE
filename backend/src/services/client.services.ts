import Client from "../entities/Client";
import ClientRepository from "../repositories/client.repository";
import { InvalidData } from "./errorMessages";
import { validateClientData } from "./validation";

export async function createClientService(clientData: Client): Promise<Client> {
    const validatedData = validateClientData(clientData);

    return await ClientRepository.createClient(validatedData);
}

export async function readClientService(clientId: number): Promise<Client> {
    return await ClientRepository.readClient(clientId);
}

export async function readAllClientsService(): Promise<Client[]> {
    return await ClientRepository.readAllClients();
}

export async function updateClientService(clientId: number) {
    await ClientRepository.updateClient(clientId);
}

export async function deleteClientService(clientId: number) {
    await ClientRepository.deleteClient(clientId);
}

export async function assignCartRelation(clientId: number, cartId: number) {

}
