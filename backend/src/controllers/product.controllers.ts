import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";
import { createProductService, readAllProductsService, readProductService, updateProductService } from "../services/product.services";

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
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const product = await readProductService(id);

        res.send(product);
    } catch (error) {
        console.error(error);
        res.send(createErrorResponse(error));
    }
}

export async function readAllProductsController(req: Request, res: Response) {
    try {
        const products = await readAllProductsService();
        
        res.send(products);
    } catch (error) {
        console.error(error);
        res.send(createErrorResponse(error));
    }
}

export async function updateProductController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const updatedProduct = await updateProductService(id, req.body);

        res.send(updatedProduct);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }

}

export async function deleteProductController(req: Request, res: Response) {

}
