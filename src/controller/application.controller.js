// controllers/applicationController.js

const db = require("../config/db");

// Apply for job
exports.applyJob = async (req, res) => {
  const { user_id, job_id, resume } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO applications(user_id,job_id,resume) VALUES($1,$2,$3) RETURNING *",
      [user_id, job_id, resume]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications
exports.getApplications = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM applications");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};