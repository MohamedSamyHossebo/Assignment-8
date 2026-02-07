import { connectDB } from './DB/connection.js';
import { bookRouter, authorRouter, logRouter } from './Modules/index.js';

const bootstrap = async (app, express) => {
    app.use(express.json());
    await connectDB();

    app.use(bookRouter);
    app.use(authorRouter);
    app.use(logRouter);

    app.use('/*dummy', (req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });
};

export default bootstrap;
