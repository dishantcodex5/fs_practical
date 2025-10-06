import { Router } from 'express';
import { getDashboardSummary, getInventorySummary, getRecentOrders, getDebugData } from '../controllers/dashboard.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/summary', auth, getDashboardSummary);
router.get('/inventory', auth, getInventorySummary);
router.get('/orders', auth, getRecentOrders);
router.get('/debug', auth, getDebugData);

export default router; 