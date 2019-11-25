import {Router} from 'express'
import * as UserController from '../controllers/users.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/:id', checkToken, catchErrors(UserController.getUser));
router.get('/', checkToken, catchErrors(UserController.getUsers));
router.post('/:id', checkToken, catchErrors(UserController.saveUser));
router.put('/:id', checkToken, catchErrors(UserController.updateUser));
router.delete('/:id', checkToken, catchErrors(UserController.deleteUser));

export default router;