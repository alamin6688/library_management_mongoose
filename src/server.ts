import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import config from "./config";

let server: Server;
const port = config.port || 3000;

async function main() {
  const dbUri =
    config.database_url ||
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.nrlryfn.mongodb.net/library_management?retryWrites=true&w=majority&appName=Cluster0`;
  await mongoose.connect(dbUri);
  console.log("Connected to MongoDB using Mongoose!");

  try {
    server = app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Error connecting to MongoDB:", error);
  }
}
main();
