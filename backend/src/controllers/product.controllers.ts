import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { InvalidBody } from "../services/errorMessages";
import { createProductService } from "../services/product.services";

export async function createProductController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const product = await createProductService(req.body);

        console.log("Creating product");
        res.send(product);
    } catch (error) {
        console.error(error);
    }
}

export async function readProductController(req: Request, res: Response) {

}

export async function updateProductController(req: Request, res: Response) {

}

export async function deleteProductController(req: Request, res: Response) {

}
