import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { createPreferenceController, successMessageController, failureMessageController } from "../controllers/payment.controllers";

const router = Router();

router.post("/payment/:cartId", verifyToken, createPreferenceController);
router.get("/success", successMessageController);
router.get("/failure", failureMessageController);

export default router;
