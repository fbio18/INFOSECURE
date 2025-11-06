import { Request, Response } from "express";
import { createCartService, readCartService, updateCartService, deleteCartService } from "../services/cart.services";
import { createErrorResponse, InvalidBody } from "../services/errorMessages";
import { validateBody } from "../services/validation";

export async function createCartController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const cart = await createCartService(req.body);

        res.send(cart);
    } catch (error) {
        console.error(error);
        res.send(createErrorResponse(error));
    }
}

export async function readCartController(req: Request, res: Response) {
    try {
        const cart = await readCartService();

        console.log("Reading cart");
        res.send(cart);
    } catch (error) {
        
    }

}

export async function updateCartController(req: Request, res: Response) {

}

export async function deleteCartController(req: Request, res: Response) {

}
