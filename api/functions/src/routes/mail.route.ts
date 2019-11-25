import {Router} from 'express'
import * as MailController from '../controllers/mails.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(MailController.verifyEmail));
router.post('/', checkToken, catchErrors(MailController.sendMail));

export default router;