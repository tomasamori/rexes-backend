import { Router } from "express";
import user from "./user.routes";
import authentication from "./authentication.routes";
import operation from "./operation.routes";

const router = Router();

router.use("/user", user);
router.use("/authentication", authentication);
router.use("/operation", operation);

export default router;
