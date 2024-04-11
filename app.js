import express, { query } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
//import dotenv from 'dotenv';

import cors from 'cors';

import contactsRouter from './routes/contactsRouter.js';

const app = express();
//dotenv.config();

const DB_HOST =
  'mongodb+srv://NStyslo:Anna8140216@cluster0.04fujrz.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0';
mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// app.listen(3000, () => {
//   console.log('Server is running. Use our API on port: 3000');
// });
