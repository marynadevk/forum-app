import express from 'express';
import { envConfig } from './config';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

const startServer = async () => {
  app.listen(envConfig.port, () => {
    console.log(`Server started on PORT = ${envConfig.port}`)
  });
}

startServer();
