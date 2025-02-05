import { Router } from "express";
import user from "./user.routes";
import authentication from "./authentication.routes";

const router = Router();

router.use("/user", user);
router.use("/authentication", authentication);

export default router;
