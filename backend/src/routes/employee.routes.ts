import { Router } from "express";
import { createEmployeeController, readEmployeeController, updateEmployeeController, deleteEmployeeController, readAllEmployeesController } from "../controllers/employee.controllers";

const router = Router();

router.post("/employee", createEmployeeController);
router.get("/employee/:id", readEmployeeController);
router.get("/employee", readAllEmployeesController);
router.put("/employee/:id", updateEmployeeController);
router.delete("/employee/:id", deleteEmployeeController);

export default router;
