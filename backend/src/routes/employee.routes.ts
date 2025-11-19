import { Router } from "express";
import { createEmployeeController, readEmployeeController, updateEmployeeController, deleteEmployeeController, readAllEmployeesController, readEmployeesByFiltersController } from "../controllers/employee.controllers";
import { verifyIfUserIsAdmin, verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/employee", verifyToken, verifyIfUserIsAdmin, createEmployeeController);
router.get("/employee/:id", verifyToken, verifyIfUserIsAdmin, readEmployeeController);
router.get("/employee", verifyToken, verifyIfUserIsAdmin, readAllEmployeesController);
router.get("/filter/employees", verifyToken, verifyIfUserIsAdmin, readEmployeesByFiltersController);
router.put("/employee/:id", verifyToken, verifyIfUserIsAdmin, updateEmployeeController);
router.delete("/employee/:id", verifyToken, verifyIfUserIsAdmin, deleteEmployeeController);

export default router;
