import { Router } from 'express';
import {
  getSources,
  submitSurveyResponse
} from '../controllers/survey.controller';

const router = Router();

router.get('/sources', getSources);
router.post('/response', submitSurveyResponse);

export default router;
