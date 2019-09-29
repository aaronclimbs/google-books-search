const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
//|| "mongodb://localhost/googleBookSearch"
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
}

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
