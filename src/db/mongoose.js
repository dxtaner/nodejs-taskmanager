const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
const { DATABASE, DATABASE_PASSWORD, DATABASE_NAME, PORT } = process.env;
const DB_URI = `mongodb+srv://${DATABASE}:${DATABASE_PASSWORD}@cluster0.guofsiq.mongodb.net/${DATABASE_NAME}`;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch((err) => {
    console.error(
      "An error occurred while connecting to the database:",
      err.message
    );
    process.exit(1);
  });

// Close the Mongoose connection when Node.js process exits
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
