import dotenv from 'dotenv'
import express from 'express';
import dbConnection from './config/db';
import categoriesRoute from './routes/categoriesRoute';
const app:express.Application = express();
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT || 3000;

dbConnection();

app.use('/api/v1/categories', categoriesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});