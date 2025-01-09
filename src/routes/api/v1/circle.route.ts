import { Router } from "express";
import * as circleCtrl from "../../../controllers/circle.controller";

const router = Router();

router.get("/:id", circleCtrl.getCircleById);
router.post("", circleCtrl.createCircle);
router.put("/:id", circleCtrl.updateCircleById);
router.delete("/:id", circleCtrl.deleteCircleById);

export default router;
