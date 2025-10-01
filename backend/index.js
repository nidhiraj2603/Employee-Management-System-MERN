const express = require("express");

const app = express();

const connectDb = require("./config/mongoose");

connectDb();

const port = 2620;

// IT WILL PARSE .body
app.use(express.json());

// TO PUT AlL ENTERED VALUES IN BODY KEY
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/routes"));

app.listen(port, (error) => {
  if (error) {
    console.log("Error in starting express server", error);
  }
  console.log("Firing up the express server on:", port);
});
