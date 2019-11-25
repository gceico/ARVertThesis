import {Router} from 'express'
import * as LocationController from '../controllers/locations.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(LocationController.getLocation));
router.get('/', checkToken, catchErrors(LocationController.getLocations));
router.post('/', checkToken, catchErrors(LocationController.saveLocation));
router.put('/:id', checkToken, catchErrors(LocationController.updateLocation));
router.delete('/:id', checkToken, catchErrors(LocationController.deleteLocation));

export default router;