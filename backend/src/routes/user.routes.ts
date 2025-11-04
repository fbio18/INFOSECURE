import { Router } from "express";
import { createUserController, readUserController, updateUserController, deleteUserController } from "../controllers/user.controllers";

const router = Router();

router.post("/user", createUserController);
router.get("/user", readUserController);
router.put("/user", updateUserController);
router.delete("/user", deleteUserController);
