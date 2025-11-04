import { Router } from "express";
import { createInvoiceController, readInvoiceController, updateInvoiceController, deleteInvoiceController } from "../controllers/invoice.controllers";

const router = Router();

router.post("/invoice", createInvoiceController);
router.get("/invoice", readInvoiceController);
router.put("/invoice", updateInvoiceController);
router.delete("/invoice", deleteInvoiceController);
