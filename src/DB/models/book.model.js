import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: String,
    year: Number,
    genres: [String],
});

export const Book = mongoose.model('Book', bookSchema);
