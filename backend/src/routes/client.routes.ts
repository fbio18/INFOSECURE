import { Router } from "express";
import { createClientController, readClientController, updateClientController, deleteClientController, readAllClientsController } from "../controllers/client.controllers";

const router = Router();

router.post("/client", createClientController);
router.get("/client/:id", readClientController);
router.get("client", readAllClientsController);
router.put("/client", updateClientController);
router.delete("/client", deleteClientController);

export default router;
