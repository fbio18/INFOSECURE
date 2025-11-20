import { Request, Response } from "express";

export async function getNotification(req: Request, res: Response) {
    try {
        console.log("LA NOTIFICACION LLEGO A GET")
        console.log(req.body);
        console.log(req.params);
        console.log(req.query);
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
