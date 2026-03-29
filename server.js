// console.log("THIS IS MY SERVER FILE ✅");

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Backend is running 🔥");
// });


// const pool = require("./src/config/db");


// app.use(cors());
// app.use(express.json());

// // ✅ ROOT
// app.get("/", (req, res) => {
//   res.send("Backend is running 🔥");
// });

// // ✅ DB TEST
// pool.connect()
//   .then(() => console.log("Database connected ✅"))
//   .catch(err => console.error(err));


// // 🔥 STEP 3 → GET API
// app.get("/users", async (req, res) => {
//   const result = await pool.query("SELECT * FROM users");
//   res.json(result.rows);
// });


// // 🔥 STEP 4 → POST API
// app.post("/users", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const result = await pool.query(
//     "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *",
//     [name, email, password, role]
//   );

//   res.json(result.rows[0]);
// });

// // DELETE API
// app.delete("/users/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       "DELETE FROM users WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "User not found ❌" });
//     }

//     res.json({ message: "User deleted successfully ✅", user: result.rows[0] });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // ✅ SERVER START
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


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