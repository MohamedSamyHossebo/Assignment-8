import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config({ path: "./src/Config/.env.secrets" });

export const connectDB = async () => {
    return await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((err) => {
            console.log('Database connection error', err);
        });
};
