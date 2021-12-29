import routerx from 'express-promise-router';
import WordRouter from './word.js'

const router = routerx();

router.use("/word", WordRouter);

export default router;