import dotenv from 'dotenv';
import express from 'express';
import dbConnection from './config/db';
import mountRouts from './routes';
import { Server } from 'http';
import compression from 'compression';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { I18n } from 'i18n';
import path from 'path';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

const app:express.Application = express();

app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-API-KEY",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  csurf({
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  })
);

app.use(express.json({ limit: "3kb" }));

app.use(compression());

app.use(ExpressMongoSanitize());

app.use(hpp({ whitelist: ['price', 'category', 'subCategory'] }));

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

const i18n = new I18n({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);

app.use(express.static("uploads"));

dotenv.config();

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