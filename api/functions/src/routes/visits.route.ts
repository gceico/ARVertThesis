import {Router} from 'express'
import * as VisitController from '../controllers/visits.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(VisitController.getVisit));
router.get('/', checkToken, catchErrors(VisitController.getVisits));
router.post('/', checkToken, catchErrors(VisitController.saveVisit));

export default router;