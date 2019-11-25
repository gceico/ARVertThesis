import {Router} from 'express'

import userRoutes from './user.route'
import adsRoutes from './ads.route'
import locationsRoutes from './locations.route'
import statisticsRoutes from './statistics.route'
import plansRoutes from './plans.route'
import visitsRoutes from './visits.route'
import categoriesRoutes from './categories.route'
import mailRoutes from './mail.route'
import uploadRoutes from './upload.route'

const router = Router();

router.use('/users', userRoutes);
router.use('/ads', adsRoutes);
router.use('/locations', locationsRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/plans', plansRoutes);
router.use('/visits', visitsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/mail', mailRoutes);
router.use('/upload', uploadRoutes);

export default router
