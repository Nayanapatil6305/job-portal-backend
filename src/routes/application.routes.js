const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET applications
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM applications");
  res.json(result.rows);
});

// APPLY job
router.post("/", async (req, res) => {
  const { user_id, job_id } = req.body;

  await pool.query(
    "INSERT INTO applications(user_id,job_id) VALUES($1,$2)",
    [user_id, job_id]
  );

  res.send("Applied successfully");
});

module.exports = router;