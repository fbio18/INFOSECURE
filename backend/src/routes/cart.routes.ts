import { Router } from "express";
import { createCartController, readCartController, updateCartController, removeItemController, readAllCartsController, addItemController } from "../controllers/cart.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/cart", verifyToken, createCartController);
router.get("/cart/:id", verifyToken, readCartController)
router.get("/cart", verifyToken, readAllCartsController);
router.put("/cart/:id/product/:productId", verifyToken, addItemController);
router.delete("/cart/:id/product/:productId", verifyToken, removeItemController)

export default router;
