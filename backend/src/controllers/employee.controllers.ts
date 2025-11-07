import { Request, Response } from "express";
import { validateBody } from "../services/validation";
import { createErrorResponse, InvalidBody, MissingData } from "../services/errorMessages";
import { createEmployeeService, readAllEmployeesService, readEmployeeService } from "../services/employee.services";

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
    try {
        if (!req.params.id) throw new MissingData();
        const id = parseInt(req.params.id);

        const employee = await readEmployeeService(id);

        res.send(employee);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function readAllEmployeesController(req: Request, res: Response) {
    try {
        const employees = await readAllEmployeesService();

        res.send(employees);
    } catch (error) {
        console.error(error);
        const errorResponse = createErrorResponse(error);
        res.status(errorResponse.statusCode).send(errorResponse);
    }
}

export async function updateEmployeeController(req: Request, res: Response) {

}

export async function deleteEmployeeController(req: Request, res: Response) {

}
