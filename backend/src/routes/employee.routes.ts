import { Router } from "express";
import { createEmployeeController, readEmployeeController, updateEmployeeController, deleteEmployeeController } from "../controllers/employee.controllers";

const router = Router();

router.post("/employee", createEmployeeController);
router.get("/employee", readEmployeeController);
router.put("/employee", updateEmployeeController);
router.delete("/employee", deleteEmployeeController);
