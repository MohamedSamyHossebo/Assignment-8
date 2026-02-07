import { Router } from 'express';
import { createCappedCollection, createLog } from './log.controller.js';

const router = Router();

// 3. Create a capped collection named “logs” with a size limit of 1MB
router.post('/collection/logs/capped', createCappedCollection);

// 7. Insert a new log into the logs collection
router.post('/logs', createLog);

export default router;
