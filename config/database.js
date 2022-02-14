const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ih-project2";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return console.log("You are now connected to the database.");
  } catch (error) {
    return console.log("Error connecting to the database:", err);
  }
};

module.exports = connectToDatabase;
