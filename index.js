import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();
const PORT = 3000

app.use(bodyParser.json());
app.use(express.json());
app.use(router)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
