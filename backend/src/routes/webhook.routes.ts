import { Router } from "express";
import { getNotification, postNotification } from "../controllers/webhooks.controllers";

const router = Router();

router.post("/notifications", getNotification);
router.get("/notifications", postNotification);
