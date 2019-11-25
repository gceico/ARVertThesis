import {Router} from 'express'
import * as AdController from '../controllers/ads.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken,  catchErrors(AdController.getAd));
router.get('/', checkToken, catchErrors(AdController.getAds));
router.post('/', checkToken, catchErrors(AdController.saveAd));
router.put('/:id', checkToken, catchErrors(AdController.updateAd));
router.delete('/:id', checkToken, catchErrors(AdController.deleteAd));

export default router;