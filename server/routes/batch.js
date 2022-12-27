import express from 'express';

import { addBatch, getBatchesByUserIdAndProblemId } from '../controllers/batch.js';

const router = express.Router();

router.post('/add', addBatch);
router.get('/:userId/:problemId', getBatchesByUserIdAndProblemId);

export default router;