const express = require("express");

const app = express();
const adminRoutes = require("./routes/admin.routes");
const notificationRoutes = require("./routes/notification.routes");

const jobPortal = require("./src/routes/backend.route");
const authRoutes = require('./src/routes/auth.routes');
// const userRoutes = require('./src/routes/user.routes');
const jobRoutes = require("./src/routes/job.routes");
const applicationRoutes = require("./src/routes/application.routes");
const resumeRoutes = require("./src/routes/resume.routes");
app.use(express.json());


// routes use
// app.use("/api/users", userRoutes);    // user endpoints mounted
app.use("/api/jobportal", jobPortal);
app.use('/api/auth', authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resumes",resumeRoutes);
app.get("/", (req, res) => {
  res.send("Job Portal Backend Running...");
});



app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);



module.exports = app;

