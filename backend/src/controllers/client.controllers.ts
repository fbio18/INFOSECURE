import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { MissingData } from "../services/errorMessages";
import { createClientService } from "../services/client.services";

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

}

export async function updateClientController(req: Request, res: Response) {

}

export async function deleteClientController(req: Request, res: Response) {

}
