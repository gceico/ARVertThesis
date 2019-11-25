import {Router} from 'express'
import * as UploadController from '../controllers/upload.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.post('/', checkToken, catchErrors(UploadController.saveBulk));
export default router;