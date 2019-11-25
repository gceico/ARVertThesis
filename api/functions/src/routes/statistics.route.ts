import {Router} from 'express'
import * as StatisticController from '../controllers/statistics.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(StatisticController.getStatistic));
router.get('/', checkToken, catchErrors(StatisticController.getStatistics));
router.post('/', checkToken, catchErrors(StatisticController.saveStatistic));
router.put('/:id', checkToken, catchErrors(StatisticController.updateStatistic));
router.delete('/:id', checkToken, catchErrors(StatisticController.deleteStatistic));

export default router;