import { Request, Response } from "express"; 
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody } from "../services/errorMessages";
import { loginService } from "../services/auth.services";

export async function loginController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const userValidationResponse = await loginService(req.body);

        res.status(201).cookie("access_token",
                   userValidationResponse.token,
                   {
                       httpOnly: true,
                       secure: false,
                       sameSite: "strict",
                       maxAge: 1000 * 60 * 60 * 24
                   })
                   .send({ token: userValidationResponse.token, user: userValidationResponse.user });
    } catch (error) {
        console.log(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}
