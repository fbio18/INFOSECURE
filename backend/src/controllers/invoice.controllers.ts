import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody } from "../services/errorMessages";
import { createInvoiceService } from "../services/invoice.services";

export async function createInvoiceController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const invoice = await createInvoiceService(req.body);
        
        res.send(invoice);
    } catch (error) {
        console.error(error);
        res.send(createErrorResponse(error));
    }
}

export async function readInvoiceController(req: Request, res: Response) {

}

export async function updateInvoiceController(req: Request, res: Response) {

}

export async function deleteInvoiceController(req: Request, res: Response) {

}
