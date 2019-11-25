import {Router} from 'express'
import * as PlanController from '../controllers/plans.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(PlanController.getPlan));
router.get('/', checkToken, catchErrors(PlanController.getPlans));
router.post('/', checkToken, catchErrors(PlanController.savePlan));
router.put('/:id', checkToken, catchErrors(PlanController.updatePlan));
router.delete('/:id', checkToken, catchErrors(PlanController.deletePlan));

export default router;