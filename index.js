import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
      origin: ['http://localhost:5173', 'https://buildong-api.vercel.app/', 'https://buildong-pi.vercel.app/'],
      methods: ["POST", "GET", "PATCH", "DELETE"],
      credentials: true
  }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(router)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
