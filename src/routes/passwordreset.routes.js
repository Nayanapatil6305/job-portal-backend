const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE reset token
router.post("/", async (req, res) => {
  try {
    const { user_id, token, expiry } = req.body;

    await pool.query(
      "INSERT INTO password_resets(user_id, token, expiry) VALUES($1,$2,$3)",
      [user_id, token, expiry]
    );

    res.send("Reset token created");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET all tokens
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM password_resets");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;