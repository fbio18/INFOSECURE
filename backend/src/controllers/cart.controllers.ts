import { Request, Response } from "express";
import { createCartService, readCartService, updateCartService, deleteCartService, readAllCartsService, addItemService } from "../services/cart.services";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";
import { validateBody } from "../services/validation";

export async function createCartController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const cart = await createCartService(req.body);

        res.status(201).send(cart);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(error);
    }
}

export async function readCartController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const cart = await readCartService(id);

        res.send(cart);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }

}

export async function readAllCartsController(req: Request, res: Response) {
    try {
        const cart = await readAllCartsService();

        console.log("Reading cart");
        res.send(cart);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }

}


export async function updateCartController(req: Request, res: Response) {

}

export async function addItemController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        if (!req.params.productId) throw new MissingData();

        const id = parseInt(req.params.id);
        const productId = parseInt(req.params.productId);

        const updatedCartItems = await addItemService(id, productId, req.body);

        res.status(201).send(updatedCartItems);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function deleteCartController(req: Request, res: Response) {

}
