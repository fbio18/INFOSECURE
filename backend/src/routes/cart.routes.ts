import { Router } from "express";
import { createCartController, readCartController, updateCartController, deleteCartController } from "../controllers/cart.controllers";

const router = Router();

router.post("/cart", createCartController);
router.get("/cart", readCartController)
router.put("/cart", updateCartController)
router.delete("/cart", deleteCartController)
