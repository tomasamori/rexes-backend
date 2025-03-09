import { Router } from "express";
import * as userController from "../../../controllers/user.controller";
import { verifyToken, isAdmin } from "../../../middlewares/authentication.middlewares";

const router = Router();

router.get("/", [verifyToken, isAdmin], userController.getAllUsers);
router.get("/:id", [verifyToken, isAdmin], userController.getUserById);
router.post("/", [verifyToken, isAdmin], userController.createUser);
router.put("/:id", [verifyToken, isAdmin], userController.updateUser);
router.delete("/:id", [verifyToken, isAdmin], userController.deleteUser);

export default router;
