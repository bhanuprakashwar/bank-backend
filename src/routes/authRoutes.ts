import express from 'express';
import  authController from '../controllers/authController.js';
import { validateRequest as middleware} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', middleware, authController.login);

export { router as authRoutes };
