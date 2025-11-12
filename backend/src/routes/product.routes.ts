import { Router } from "express";
import { createProductController, readProductController, updateProductController, deleteProductController, readAllProductsController } from "../controllers/product.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/product", verifyToken, createProductController);
router.get("/product/:id", readProductController);
router.get("/product", readAllProductsController);
router.put("/product/:id", verifyToken, updateProductController);
router.delete("/product/:id", verifyToken, deleteProductController);

export default router;
