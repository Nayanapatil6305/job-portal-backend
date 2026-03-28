const savedJobsRoutes = require("./routes/savedJobsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");

app.use("/saved-jobs", savedJobsRoutes);
app.use("/notifications", notificationRoutes);
app.use("/resumes", resumeRoutes);
app.use("/interviews", interviewRoutes);
app.use("/reviews", reviewRoutes);
// app.use("/password-reset", passwordResetRoutes);