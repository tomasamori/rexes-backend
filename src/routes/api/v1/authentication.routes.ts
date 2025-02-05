import { Router } from "express";
import * as authenticationController from "../../../controllers/authentication.controller";

const router = Router();

router.post("/signin", authenticationController.signIn);

export default router;
