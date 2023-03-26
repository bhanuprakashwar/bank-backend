import express from 'express';
import  userController  from '../controllers/userController.js';
import { validateRequest as middleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', middleware, userController.getAllUsers);
router.get('/:id', middleware, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', middleware, userController.updateUser);
router.delete('/:id', middleware, userController.deleteUser);

export { router as userRoutes };
