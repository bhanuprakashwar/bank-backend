import { Router } from "express"
import balanceController from "../controllers/balanceController.js"
import { validateRequest as middleware } from "../middleware/authMiddleware.js"
const router = Router();

router.post("/updateBalance", middleware, balanceController.updateBalance);
router.post("/deleteBalanceAccount", middleware, balanceController.deleteBalanceAccount);
router.post("/getBalance", middleware, balanceController.getBalance);
export { router as balanceRoutes };

