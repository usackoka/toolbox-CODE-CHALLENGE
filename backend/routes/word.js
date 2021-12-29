import routerx from 'express-promise-router';
import WordController from "../controllers/wordController.js";
const router=routerx();

router.get("/iecho", WordController.iecho);

export default router;