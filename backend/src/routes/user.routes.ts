import { Router } from "express";
import { createUserController, readUserController, updateUserController, deleteUserController, readAllUsersController } from "../controllers/user.controllers";

const router = Router();

router.post("/user", createUserController);
router.get("/user/:id", readUserController);
router.get("/user", readAllUsersController);
router.put("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

export default router;
