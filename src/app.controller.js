import { bookRouter, authorRouter, logRouter } from './Modules/index.js';
import { dbConnection } from './DB/connection.js';

export const bootstrap = async (app, express) => {
    // Connect to Database
    await dbConnection();

    // Global Middleware
    app.use(express.json());

    // Routes
    app.use(bookRouter);
    app.use(authorRouter);
    app.use(logRouter);

    // Root endpoint
    app.get('/', (req, res) => res.send('Hello World!'));

    // Global Error Handling (Optional but good practice)
    app.use('*', (req, res) => {
        return res.json({ message: 'Page Not Found' });
    });
};
