const express = require("express");

const app = express();
const jobPortal = require("./src/routes/backend.route");
const authRoutes = require('./src/routes/auth.routes');
app.use(express.json());
// app.use("/api/users", userRoutes);    // user endpoints mounted
app.use("/api/jobportal", jobPortal);
app.use('/api/auth', authRoutes);

module.exports = app;

