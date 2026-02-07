import express from 'express';
import { bootstrap } from './src/app.controller.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
