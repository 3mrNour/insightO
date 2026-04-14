
import { createApp } from './app.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; 
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



const port = Number(process.env.PORT) || 5000;

const app = createApp();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
