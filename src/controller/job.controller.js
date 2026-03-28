// controllers/jobController.js

const db = require("../config/db");

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jobs");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single job
exports.getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM jobs WHERE id=$1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create job
exports.createJob = async (req, res) => {
  const { title, location, salary, company_id } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO jobs(title,location,salary,company_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [title,  location, salary, company_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete job
exports.deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM jobs WHERE id=$1", [id]);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};