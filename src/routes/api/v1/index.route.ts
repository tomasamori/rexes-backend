import { Router } from "express";
import circle from "./circle.route";

const router = Router();

router.use("/circle", circle);

export default router;
