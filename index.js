// Gets access to environment variables/settings
require("dotenv").config();

// Connects to the database
const connectToDatabase = require("./database/index");
connectToDatabase();

// Handles http requests (express is a Node.js framework)
const express = require("express");
const app = express();
const path = require("path");

// Stablishes public folder location
app.use(express.static(path.join(__dirname, "public")));

const hbs = require("hbs");

// Stablishes the view engine to Handlebars and views folder location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

// Parses incoming requests with urlencoded payloads and is based on body-parser.The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));

// Route Handling
const index = require("./routes/index");
app.use("/", index);

// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
