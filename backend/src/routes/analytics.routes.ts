import { Router } from 'express';
import { registerEvent } from '../controllers/analytics.controller';

const router = Router();
router.post('/', registerEvent);

export default router;
