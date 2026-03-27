const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all users
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// POST user
router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;

  await pool.query(
    "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)",
    [name, email, password, role]
  );

  res.send("User added");
});

// DELETE user
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.send("User deleted");
});

module.exports = router;