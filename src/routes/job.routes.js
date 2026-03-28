const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET jobs
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM jobs");
  res.json(result.rows);
});

// POST job
router.post("/", async (req, res) => {
  const { title, description, salary, location, company_id, recruiter_id } = req.body;

  await pool.query(
    "INSERT INTO jobs(title,description,salary,location,company_id,recruiter_id) VALUES($1,$2,$3,$4,$5,$6)",
    [title, description, salary, location, company_id, recruiter_id]
  );

  res.send("Job added");
});

module.exports = router;