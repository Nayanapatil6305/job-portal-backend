const express = require("express");

const app = express();
const jobPortal = require("./src/routes/backend.route");

app.use(express.json());
app.use("/api/jobportal", jobPortal);
module.exports = app;


