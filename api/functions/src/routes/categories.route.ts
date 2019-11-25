import {Router} from 'express'
import * as CategoryController from '../controllers/categories.controller'
import {catchErrors} from '../helpers/errorHelpers'
import {checkToken} from "../helpers/security";

const router = Router();
router.get('/', checkToken, catchErrors(CategoryController.getCategories));

export default router;