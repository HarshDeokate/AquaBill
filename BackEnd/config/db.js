import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
  mongoose.connect(`mongodb://localhost:27017/`)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  }); 
}
export default connectDB; 

