import Client from "../entities/Client";
import ClientRepository from "../repositories/client.repository";
import { InvalidData, InvalidId } from "./errorMessages";
import { validateUpdateClientData } from "./update-validation";
import { validateClientData, validateNumberId } from "./validation";

export async function createClientService(clientData: Client): Promise<Client> {
    const validatedData = validateClientData(clientData);

    return await ClientRepository.createClient(validatedData);
}

export async function readClientService(clientId: number): Promise<Client> {
    if (!validateNumberId(clientId)) throw new InvalidId("number");

    return await ClientRepository.readClient(clientId);
}

export async function readAllClientsService(): Promise<Client[]> {
    return await ClientRepository.readAllClients();
}

export async function updateClientService(clientId: number, clientData: Partial<Client>): Promise<Client> {
    if (!validateNumberId(clientId)) throw new InvalidId("number");
    if (!validateUpdateClientData(clientData)) throw new InvalidData();

    return await ClientRepository.updateClient(clientId, clientData);
}

export async function deleteClientService(clientId: number) {
    await ClientRepository.deleteClient(clientId);
}

export async function assignCartRelation(clientId: number, cartId: number) {

}
