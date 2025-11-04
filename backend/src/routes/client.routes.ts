import { Router } from "express";
import { createClientController, readClientController, updateClientController, deleteClientController } from "../controllers/client.controllers";

const router = Router();

router.post("/client", createClientController);
router.get("/client", readClientController);
router.put("/client", updateClientController);
router.delete("/client", deleteClientController);
