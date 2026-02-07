import { Router } from 'express';
import { createAuthor } from './author.controller.js';

const router = Router();

// 2. Create an implicit collection by inserting data directly into a new collection named “authors”
router.post('/collection/authors', createAuthor);

export default router;
