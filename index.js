// 1. IMPORTS

// Gets access to environment variables/settings
require("dotenv").config();

// Handles http requests (express is a Node.js framework)
const express = require("express");
const app = express();
const path = require("path");

// ***
const sessionManager = require("./config/session");
sessionManager(app);

// Connects to the database
const connectToDatabase = require("./config/database");
connectToDatabase();


// Stablishes public folder location
app.use(express.static(path.join(__dirname, "public")));

const hbs = require("hbs");

// Stablishes the view engine to Handlebars and views folder location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('ifCondNegate', function(v1, v2, options) {
  if(v1 != v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Parses incoming requests with urlencoded payloads and is based on body-parser.The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// Route Handling
const index = require("./routes/index");
app.use("/", index);
const auth = require("./routes/auth");
app.use("/auth", auth);
const locations = require("./routes/locations");
app.use("/locations", locations);

// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
