import * as all from './interfaces';
import dotenv from 'dotenv';
import express from 'express';
import dbConnection from './config/db';
import mountRouts from './routes';
import { Server } from 'http';
const app:express.Application = express();
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3000;

dbConnection();

mountRouts(app);

let server: Server;

server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Application is shutting down ...");
    process.exit(1);
  })
})