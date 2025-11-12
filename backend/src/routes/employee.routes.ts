import { Router } from "express";
import { createEmployeeController, readEmployeeController, updateEmployeeController, deleteEmployeeController, readAllEmployeesController } from "../controllers/employee.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/employee", verifyToken, createEmployeeController);
router.get("/employee/:id", verifyToken, readEmployeeController);
router.get("/employee", verifyToken, readAllEmployeesController);
router.put("/employee/:id", verifyToken, updateEmployeeController);
router.delete("/employee/:id", verifyToken, deleteEmployeeController);

export default router;
