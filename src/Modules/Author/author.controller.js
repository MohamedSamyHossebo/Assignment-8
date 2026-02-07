import { Author } from '../../DB/models/author.model.js';

export const createAuthor = async (req, res) => {
    try {
        const { name, bio, birthDate } = req.body;
        const author = await Author.create({
            name,
            bio,
            birthDate: new Date(birthDate),
        });
        res.status(201).json({ message: 'Author created successfully', author });
    } catch (err) {
        res.status(500).json({ message: 'Error creating author', error: err });
    }
};
