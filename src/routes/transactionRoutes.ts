import { Router } from 'express';
import { validateRequest as middleware } from '../middleware/authMiddleware.js';
import transactionController from '../controllers/transactionController.js';
const router = Router();

router.post('/transferTo', middleware, transactionController.transferMoney);
router.post('/getTransactions', middleware, transactionController.getTransactions);

export { router as transactionRoutes }