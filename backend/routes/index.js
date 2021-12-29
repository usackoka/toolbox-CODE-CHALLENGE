import routerx from 'express-promise-router';
import WordRouter from './word.js'

const router = routerx();

router.use("", WordRouter);

export default router;