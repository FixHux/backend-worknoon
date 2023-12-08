import mongoose from "mongoose";
import { config } from "../config";

const { MONGODBURI } = config;

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODBURI, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Enables the new unified topology engine
      // useCreateIndex: true
    });
    console.log(`Connected to Database`);
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
};

// Workaround to make TypeScript happy
declare module "mongoose" {
  interface ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    useCreateIndex?: boolean;
  }
}
