import { Router } from "express";
import { createUserController, readUserController, updateUserController, deleteUserController, readAllUsersController } from "../controllers/user.controllers";
import { verifyIfUserIsAdmin, verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/user", createUserController);
router.get("/user/:id", readUserController);
router.get("/user", verifyToken, verifyIfUserIsAdmin, readAllUsersController);
router.put("/user/:id", verifyToken, updateUserController);
router.delete("/user/:id", verifyToken, verifyIfUserIsAdmin, deleteUserController);

export default router;
