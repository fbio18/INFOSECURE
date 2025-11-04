import { Router } from "express";
import { createProductController, readProductController, updateProductController, deleteProductController } from "../controllers/product.controllers";

const router = Router();

router.post("/product", createProductController);
router.get("/product", readProductController);
router.put("/product", updateProductController);
router.delete("/product", deleteProductController);
