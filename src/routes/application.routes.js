const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // PostgreSQL connection

// ✅ 1. GET all applications for a specific user
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      `SELECT a.id, a.user_id, a.job_id, j.title AS job_title, j.company, 
              a.applied_at, a.status, a.resume_url, a.linkedin_url, a.video_url
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.user_id = $1
       ORDER BY a.applied_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. POST a new application
router.post("/", async (req, res) => {
  try {
    const { user_id, job_id, resume_url, linkedin_url, video_url } = req.body;

    const result = await pool.query(
      `INSERT INTO applications(user_id, job_id, resume_url, linkedin_url, video_url) 
       VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, job_id, resume_url, linkedin_url, video_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. PUT update application status (Admin / Recruiter)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Applied / Shortlisted / Rejected

    const result = await pool.query(
      `UPDATE applications SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;