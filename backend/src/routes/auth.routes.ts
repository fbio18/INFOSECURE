import { Router } from "express";
import { confirmEmailController, loginController } from "../controllers/auth.controllers";

const router = Router();

router.post("/login", loginController);
router.post("confirm-email", confirmEmailController);

export default router;
