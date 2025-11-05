import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { InvalidBody } from "../services/errorMessages";
import { createEmployeeService } from "../services/employee.services";

export async function createEmployeeController(req: Request, res: Response) {
    try {
        if (!validateBody(req.body)) throw new InvalidBody();

        const employee = await createEmployeeService(req.body);

        res.send(employee);
    } catch (error) {
        console.error(error);
    }
}

export async function readEmployeeController(req: Request, res: Response) {

}

export async function updateEmployeeController(req: Request, res: Response) {

}

export async function deleteEmployeeController(req: Request, res: Response) {

}
