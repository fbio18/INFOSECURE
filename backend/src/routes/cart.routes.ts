import { Router } from "express";
import { createCartController, readCartController, updateCartController, deleteCartController } from "../controllers/cart.controllers";

const router = Router();

router.post("/cart", createCartController);
router.get("/cart/:id", readCartController)
router.get("/cart")
router.put("/cart", updateCartController)
router.delete("/cart", deleteCartController)

export default router;
