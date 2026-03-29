const express = require("express");
const router = express.Router();
const pool = require("../db"); // PostgreSQL connection

// ✅ 1. Get resume for a specific user
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM resumes WHERE user_id = $1",
      [user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Create new resume
router.post("/", async (req, res) => {
  try {
    const { user_id, full_name, email, phone, skills, experience, education } = req.body;

    const result = await pool.query(
      `INSERT INTO resumes(user_id, full_name, email, phone, skills, experience, education)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user_id, full_name, email, phone, skills, experience, education]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. Update resume
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email, phone, skills, experience, education } = req.body;

    const result = await pool.query(
      `UPDATE resumes 
       SET full_name=$1, email=$2, phone=$3, skills=$4, experience=$5, education=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [full_name, email, phone, skills, experience, education, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;