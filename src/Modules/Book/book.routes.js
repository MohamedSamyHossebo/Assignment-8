import { Router } from 'express';
import * as bookController from './book.controller.js';

const router = Router();

// 1
router.post('/collection/books', bookController.createBookCollection);
// 4
router.post('/collection/books/index', bookController.createBookIndex);
// 5
router.post('/books', bookController.createBook);
// 6
router.post('/books/batch', bookController.createBooksBatch);
// 8
router.patch('/books/:title', bookController.updateBookYear);
// 9
router.get('/books/title', bookController.findBookByTitle);
// 10
router.get('/books/year', bookController.findBooksByYearRange);
// 11
router.get('/books/genre', bookController.findBooksByGenre);
// 12
router.get('/books/skip-limit', bookController.findBooksSkipLimit);
// 13
router.get('/books/year-integer', bookController.findBooksYearInteger);
// 14
router.get('/books/exclude-genres', bookController.findBooksExcludeGenres);
// 15
router.delete('/books/before-year', bookController.deleteBooksBeforeYear);
// 16
router.get('/books/aggregate1', bookController.aggregateBooks1);
// 17
router.get('/books/aggregate2', bookController.aggregateBooks2);
// 18
router.get('/books/aggregate3', bookController.aggregateBooks3);
// 19
router.get('/books/aggregate4', bookController.aggregateBooks4);

export default router;
