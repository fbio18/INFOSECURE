import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";
import { createPreference, makePayment } from "../services/payment.services";


export async function createPreferenceController(req: Request, res: Response) {
    try {
        if (!req.params.cartId) throw new MissingData();
        const cartId = parseInt(req.params.cartId);

        const payment = await createPreference(cartId);

        console.log("Creando preferencia de Mercado Pago");
        res.status(201).send(`
                             <h1>Para realizar el pago andá al link de abajo</h1>
                             <a href=${payment.init_point}>Link</a>
                             `);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function successMessageController(req: Request, res: Response) {
    try {

        const user = (req.body as any).user;
        if (!user) throw new Error("not-found");

        //const orderDetail  = await makePayment()

        //res.status(201).send(orderDetail);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export function failureMessageController(req: Request, res: Response) {
    try {
        res.send("MAL AHÍ, PA. TE FALLÓ EL PAGO");
    } catch (error) {
        console.error(error);
        const err = createErrorResponse(error as Error);
        res.status(err.statusCode).send(err.message);
    }
}
