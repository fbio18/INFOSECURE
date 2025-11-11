import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, MissingData } from "../services/errorMessages";
import { createClientService, deleteClientService, readAllClientsService, readClientService, updateClientService } from "../services/client.services";

export async function createClientController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new MissingData();

        const client = await createClientService(req.body);

        res.send(client);
    } catch (error) {
        console.error(error);
    }
}

export async function readClientController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const client = await readClientService(id);

        res.send(client)
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function readAllClientsController(req: Request, res: Response) {
    try {
        const clients = await readAllClientsService();

        res.send(clients);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function updateClientController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const updatedClient = await updateClientService(id, req.body);

        res.send(updatedClient)
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function deleteClientController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const deletedClientResult = await deleteClientService(id);

        res.send(deletedClientResult)
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}
