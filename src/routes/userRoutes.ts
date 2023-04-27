import express from 'express'
import userController from '../controllers/userController.js'
import { validateRequest as middleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/usersCount', middleware, userController.getTotalUserCount)
router.get('/', middleware, userController.getUserById)
router.post('/', userController.createUser)
router.put('/', middleware, userController.updateUser)
router.delete('/', middleware, userController.deleteUser)

export { router as userRoutes }
