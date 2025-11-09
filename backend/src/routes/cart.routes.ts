import { Router } from "express";
import { createCartController, readCartController, updateCartController, deleteCartController, readAllCartsController, addItemController } from "../controllers/cart.controllers";

const router = Router();

router.post("/cart", createCartController);
router.get("/cart/:id", readCartController)
router.get("/cart", readAllCartsController);
router.put("/cart/:id/product/:productId", addItemController);
router.delete("/cart", deleteCartController)

export default router;
