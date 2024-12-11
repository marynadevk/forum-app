import express from 'express';
import { envConfig } from './config';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './router/auth';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(authRouter);

const startServer = async () => {
  await mongoose.connect(envConfig.dbUrl as string);
  app.listen(envConfig.port, () => {
    console.log(`Server started on PORT = ${envConfig.port}`)
  });
};

startServer();
