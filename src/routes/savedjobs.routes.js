const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all saved jobs
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM saved_jobs");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// SAVE job
router.post("/", async (req, res) => {
  try {
    const { user_id, job_id } = req.body;

    await pool.query(
      "INSERT INTO saved_jobs(user_id, job_id) VALUES($1, $2)",
      [user_id, job_id]
    );

    res.send("Job saved");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE saved job
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM saved_jobs WHERE id=$1", [req.params.id]);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;