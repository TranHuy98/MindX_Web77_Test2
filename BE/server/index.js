import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import filmRouter from './routes/filmRoute.js';
import authRouter from './routes/authRoute.js';

const app = express();
const PORT = 8000;

mongoose.connect('mongodb+srv://Huy225:tranhuy98@cluster0.x6ev1uq.mongodb.net/film_db_mindx_test2');

app.use(bodyParser.json());

// Router login logout
app.use('/auth', authRouter);

// Router film
app.use('/films', filmRouter)

app.get('', (req, res) => {
  res.send('Hello world!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});