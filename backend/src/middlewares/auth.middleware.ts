import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { createErrorResponse, CustomError } from "../services/errorMessages";

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token;

    try {
        if (!token) throw new CustomError("Acceso denegado. Por favor inicie sesión", 401);
        
        const decoded = jwt.verify(token, JWT_SECRET);

        (req as any).user = decoded;

        next();
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}
