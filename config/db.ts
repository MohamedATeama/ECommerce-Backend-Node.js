import mongoose from "mongoose";

const DB = process.env.DB || "mongodb://localhost:27017/";

const dbConnection = () => {
  mongoose.connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
};

export default dbConnection;