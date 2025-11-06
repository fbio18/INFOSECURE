import { Request, Response } from "express";
import { createUserService, readUserService, readsAllUsersService, updateUserService, deleteUserService } from "../services/user.services";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";

export async function createUserController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const newUser = await createUserService(req.body);

        console.log("User created");
        res.send(newUser);
    } catch (error) {
        console.error(error);
        res.send(createErrorResponse(error));
    }
}

export async function readUserController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();

        const userId = parseInt(req.params.id);

        const user = await readUserService(userId);
        
        res.send(user);
    } catch (error) {
        console.error(error);
    }
}

export async function readAllUsersController(req: Request, res: Response) {
    try {
        const users = await readsAllUsersService();

        res.send(users);
    } catch (error) {
        console.error(error);
    }
}

export async function updateUserController(req: Request, res: Response) {

}

export async function deleteUserController(req: Request, res: Response) {

}
