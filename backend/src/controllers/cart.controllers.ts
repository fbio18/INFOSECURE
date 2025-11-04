import { Request, Response } from "express";
import { createCartService, readCartService, updateCartService, deleteCartService } from "../services/cart.services";

export async function createCartController(req: Request, res: Response) {
    try {
        const cart = await createCartService();

        console.log("Creating cart");
        res.send(cart);
    } catch (error) {

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
