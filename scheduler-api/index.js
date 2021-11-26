require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// database config
require("./db/mongoose");

// api routes
const routes = require("./routes/schedule.router");

// app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(9000, () => console.log("server is listening !"));
