import { Request, Response } from "express"; 
import { validateBody } from "../services/validation";
import { createErrorResponse, CustomError, InvalidBody } from "../services/errorMessages";
import { confirmEmailService, loginService } from "../services/auth.services";
import { ENVIRONMENT } from "../config";

export async function loginController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const userValidationResponse = await loginService(req.body);

        res.status(201).cookie("access_token",
                   userValidationResponse.token,
                   {
                       httpOnly: true,
                       //secure: ENVIRONMENT !== "test",
                       secure: true,
                       sameSite: "none",
                       maxAge: 1000 * 60 * 60 * 24
                   })
                   .send({ user: userValidationResponse.user });
    } catch (error) {
        console.log(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function confirmEmailController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        if (!req.cookies) throw new CustomError("No posee las cookies necesarias para iniciar sesión", 400);
        const user = (req.cookies as any).user;

        const emailValidationResponse = await confirmEmailService(user.user_id, req.body);

        res.status(201).send(emailValidationResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send({ verified: false });
    }
}
