import { Request, Response } from "express";
import { createUserService, readUserService, readsAllUserService, updateUserService, deleteUserService } from "../services/user.services";
import { validateBody } from "../services/validation";
import { InvalidBody } from "../services/errorMessages";

export async function createUserController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const newUser = await createUserService(req.body);

        console.log("User created");
        res.send(newUser);
    } catch (error) {
        console.error(error);
    }
}

export async function readUserController(req: Request, res: Response) {

}

export async function updateUserController(req: Request, res: Response) {

}

export async function deleteUserController(req: Request, res: Response) {

}
