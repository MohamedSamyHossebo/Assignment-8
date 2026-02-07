import { Log } from '../../DB/models/log.model.js';
import mongoose from 'mongoose';

export const createCappedCollection = async (req, res) => {
    try {
        // Check if collection exists
        const collections = await mongoose.connection.db
            .listCollections({ name: 'logs' })
            .toArray();
        if (collections.length > 0) {
            return res.status(200).json({ message: 'Collection already exists' });
        }

        // Create capped collection explicitly if needed, but Mongoose model handles it on creation usually if autoCreate is true.
        // However, to strictly follow the "Create a capped collection" instruction via endpoint:
        await mongoose.connection.db.createCollection('logs', {
            capped: true,
            size: 1048576,
            max: 1000,
        });
        res.status(201).json({ message: 'Capped collection created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating collection', error: err });
    }
};

export const createLog = async (req, res) => {
    try {
        const { message, level } = req.body;
        const log = await Log.create({ message, level });
        res.status(201).json({ message: 'Log entry created', log });
    } catch (err) {
        res.status(500).json({ message: 'Error creating log', error: err });
    }
};
