import routerx from 'express-promise-router'
import WordController from '../controllers/wordController.js'
import { WordMiddleware } from '../middlewares/index.js'

const router = routerx()

router.get('/iecho', WordMiddleware.validQueryParams, WordController.iecho)

export default router
