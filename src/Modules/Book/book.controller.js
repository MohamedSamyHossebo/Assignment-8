import { Book } from '../../DB/models/book.model.js';

// 1. Create an explicit collection named “books” with a validation rule
export const createBookCollection = async (req, res) => {
    try {
        await Book.createCollection();
        res.status(201).json({ message: 'Books collection created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating collection', error: err });
    }
};

// 4. Create an index on the books collection for the title field
export const createBookIndex = async (req, res) => {
    try {
        await Book.collection.createIndex({ title: 1 });
        res.status(201).json({ message: 'Index created on title field' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating index', error: err });
    }
};

// 5. Insert one document into the books collection
export const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: 'Book created', book });
    } catch (err) {
        res.status(500).json({ message: 'Error creating book', error: err });
    }
};

// 6. Insert multiple documents into the books collection
export const createBooksBatch = async (req, res) => {
    try {
        const books = await Book.insertMany(req.body);
        res.status(201).json({ message: 'Books created', books });
    } catch (err) {
        res.status(500).json({ message: 'Error creating books', error: err });
    }
};

// 8. Update the book with title “Future” change the year to be 2022
export const updateBookYear = async (req, res) => {
    try {
        const { title } = req.params;
        const { year } = req.body;
        const updatedBook = await Book.findOneAndUpdate(
            { title },
            { year: 2022 },
            { new: true }
        );
        res.status(200).json({ message: 'Book updated', updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err });
    }
};

// 9. Find a Book with title “Brave New World”
export const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const book = await Book.findOne({ title });
        res.status(200).json({ message: 'Book found', book });
    } catch (err) {
        res.status(500).json({ message: 'Error finding book', error: err });
    }
};

// 10. Find all books published between 1990 and 2010
export const findBooksByYearRange = async (req, res) => {
    try {
        const { from, to } = req.query;
        const books = await Book.find({
            year: { $gte: Number(from), $lte: Number(to) },
        });
        res.status(200).json({ message: 'Books found', books });
    } catch (err) {
        res.status(500).json({ message: 'Error finding books', error: err });
    }
};

// 11. Find books where the genre includes "Science Fiction"
export const findBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await Book.find({ genres: genre });
        res.status(200).json({ message: 'Books found', books });
    } catch (err) {
        res.status(500).json({ message: 'Error finding books', error: err });
    }
};

// 12. Skip the first two books, limit the results to the next three, sorted by year in descending order
export const findBooksSkipLimit = async (req, res) => {
    try {
        const books = await Book.find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3);
        res.status(200).json({ message: 'Books found', books });
    } catch (err) {
        res.status(500).json({ message: 'Error finding books', error: err });
    }
};

// 13. Find books where the year field stored as an integer
export const findBooksYearInteger = async (req, res) => {
    try {
        const books = await Book.find({ year: { $type: 'int' } });
        res.status(200).json({ message: 'Books found', books });
    } catch (err) {
        res.status(500).json({ message: 'Error finding books', error: err });
    }
};

// 14. Find all books where the genres field does not include "Horror" or "Science Fiction"
export const findBooksExcludeGenres = async (req, res) => {
    try {
        const books = await Book.find({
            genres: { $nin: ['Horror', 'Science Fiction'] },
        });
        res.status(200).json({ message: 'Books found', books });
    } catch (err) {
        res.status(500).json({ message: 'Error finding books', error: err });
    }
};

// 15. Delete all books published before 2000
export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const { year } = req.query;
        const result = await Book.deleteMany({ year: { $lt: Number(year) } });
        res.status(200).json({ message: 'Books deleted', result });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting books', error: err });
    }
};

// 16. Aggregation: Filter books published after 2000 and sort by year desc
export const aggregateBooks1 = async (req, res) => {
    try {
        const books = await Book.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } },
        ]);
        res.status(200).json({ message: 'Aggregation 1 result', books });
    } catch (err) {
        res.status(500).json({ message: 'Error in aggregation', error: err });
    }
};

// 17. Aggregation: Published after 2000, project title, author, year
export const aggregateBooks2 = async (req, res) => {
    try {
        const books = await Book.aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { title: 1, author: 1, year: 1, _id: 0 } },
        ]);
        res.status(200).json({ message: 'Aggregation 2 result', books });
    } catch (err) {
        res.status(500).json({ message: 'Error in aggregation', error: err });
    }
};

// 18. Aggregation: Unwind genres
export const aggregateBooks3 = async (req, res) => {
    try {
        const books = await Book.aggregate([{ $unwind: '$genres' }]);
        res.status(200).json({ message: 'Aggregation 3 result', books });
    } catch (err) {
        res.status(500).json({ message: 'Error in aggregation', error: err });
    }
};

// 19. Aggregation: Join books with logs
export const aggregateBooks4 = async (req, res) => {
    try {
        const books = await Book.aggregate([
            {
                $lookup: {
                    from: 'logs',
                    localField: 'title',
                    foreignField: 'message',
                    as: 'related_logs',
                },
            },
        ]);
        res.status(200).json({ message: 'Aggregation 4 result', books });
    } catch (err) {
        res.status(500).json({ message: 'Error in aggregation', error: err });
    }
};
