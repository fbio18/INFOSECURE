import { Router } from "express";
import { createProductController, readProductController, updateProductController, deleteProductController, readAllProductsController } from "../controllers/product.controllers";

const router = Router();

router.post("/product", createProductController);
router.get("/product/:id", readProductController);
router.get("/product", readAllProductsController);
router.put("/product/:id", updateProductController);
router.delete("/product", deleteProductController);

export default router;
