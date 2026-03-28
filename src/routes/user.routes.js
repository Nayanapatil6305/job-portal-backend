// const express = require("express");
// const router = express.Router();
// const pool = require("../db");

// // GET all users
// router.get("/", async (req, res) => {
//   const result = await pool.query("SELECT * FROM users");
//   res.json(result.rows);
// });

// // POST user
// router.post("/", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   await pool.query(
//     "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)",
//     [name, email, password, role]
//   );

//   res.send("User added");
// });

// // DELETE user
// router.delete("/:id", async (req, res) => {
//   await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
//   res.send("User deleted");
// });

// module.exports = router;


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES IMPORT
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedJobsRoutes = require("./routes/savedJobsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// ✅ ROUTES USE (IMPORTANT)
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/reviews", reviewRoutes);

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("Backend running 🔥");
});

// ✅ START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});