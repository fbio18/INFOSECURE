import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";
import { createInvoiceService, readAllInvoicesService, readInvoicesByFilterService, readInvoiceService, updateInvoiceService } from "../services/invoice.services";

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
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const invoice = await readInvoiceService(id);

        res.send(invoice);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function readAllInvoicesController(req: Request, res: Response) {
    try {
        const invoices = await readAllInvoicesService();

        res.send(invoices);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function readInvoicesByFilterController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const invoices = await readInvoicesByFilterService(req.body);

        res.send(invoices);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function updateInvoiceController(req: Request, res: Response) {
    try {
        if (!req.params.id) throw new MissingData();
        if (!req.body) throw new InvalidBody();

        const id = parseInt(req.params.id);

        const updatedInvoice = await updateInvoiceService(id, req.body);

        res.send(updatedInvoice);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function deleteInvoiceController(req: Request, res: Response) {

}
