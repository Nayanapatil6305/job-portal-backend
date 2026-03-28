const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET interviews
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM interviews");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// SCHEDULE interview
router.post("/", async (req, res) => {
  try {
    const { application_id, interview_date, status } = req.body;

    await pool.query(
      "INSERT INTO interviews(application_id, interview_date, status) VALUES($1, $2, $3)",
      [application_id, interview_date, status]
    );

    res.send("Interview scheduled");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE interview
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await pool.query(
      "UPDATE interviews SET status=$1 WHERE id=$2",
      [status, req.params.id]
    );

    res.send("Interview updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;