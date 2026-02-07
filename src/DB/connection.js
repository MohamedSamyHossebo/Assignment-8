import mongoose from 'mongoose';

export const dbConnection = async () => {
    return await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((err) => {
            console.log('Database connection error', err);
        });
};
