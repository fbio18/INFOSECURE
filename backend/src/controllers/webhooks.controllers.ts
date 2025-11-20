import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { InvalidBody } from "../services/errorMessages";

export async function getNotification(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        console.log("LA NOTIFICACION LLEGO A GET")
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);

        res.send({ message: "Hola pude completarme" });
    } catch (error) {
        console.error(error);
    }
}

export async function postNotification(req: Request, res: Response) {
    try {
        console.log("LA NOTIFICACION LLEGO A POST")
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);
    } catch (error) {
        console.error(error);
    }
}
