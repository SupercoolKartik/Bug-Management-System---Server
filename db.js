import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      //   dbName: "bbbbbbmmmmsssss",
    });
    mongodb: console.log("Connected to MongoDB");
  } catch (error) {
    if (error instanceof mongoose.Error) {
      // Log Mongoose-specific errors
      console.error("Mongoose error:", error);
    } else {
      // Log other types of errors
      console.error("Unexpected error:", error);
    }
  }
};

export default connectToMongo;
