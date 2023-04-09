import { Router } from 'express';
import {authRoutes} from './authRoutes.js';
import {userRoutes} from './userRoutes.js';
import {balanceRoutes} from './balanceRoutes.js';
import {transactionRoutes} from './transactionRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/balance', balanceRoutes);
router.use('/transactions', transactionRoutes);

export default router;
