import { Router } from "express";
import { createInvoiceController, readInvoiceController, updateInvoiceController, deleteInvoiceController, readAllInvoicesController, readInvoicesByFilterController } from "../controllers/invoice.controllers";

const router = Router();

router.post("/invoice", createInvoiceController);
router.get("/invoice/:id", readInvoiceController);
router.get("/invoice", readAllInvoicesController);
router.get("/filter/invoices", readInvoicesByFilterController);
router.put("/invoice/:id", updateInvoiceController);
router.delete("/invoice", deleteInvoiceController);

export default router;
