import { Router } from "express";
import * as operationController from "../../../controllers/operation.controller";
import { verifyToken, isAdmin } from "../../../middlewares/authentication.middlewares";

const router = Router();

router.get("/", [verifyToken], operationController.getAllOperations);
router.get("/:id", [verifyToken], operationController.getOperationById);
router.post("/", [verifyToken], operationController.createOperation);
router.put("/:id", [verifyToken, isAdmin], operationController.updateOperation);
router.delete("/:id", [verifyToken, isAdmin], operationController.deleteOperation);

export default router;
