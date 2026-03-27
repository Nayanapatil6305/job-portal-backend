const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET resumes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resumes");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ADD resume
router.post("/", async (req, res) => {
  try {
    const { user_id, file_url } = req.body;

    await pool.query(
      "INSERT INTO resumes(user_id, file_url) VALUES($1, $2)",
      [user_id, file_url]
    );

    res.send("Resume uploaded");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE resume
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM resumes WHERE id=$1", [req.params.id]);
    res.send("Resume deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;