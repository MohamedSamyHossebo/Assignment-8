import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
    {
        message: String,
        level: String,
    },
    {
        capped: { size: 1048576, max: 1000 },
    }
);

export const Log = mongoose.model('Log', logSchema);
