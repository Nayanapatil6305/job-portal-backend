const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET notifications
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notifications");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ADD notification
router.post("/", async (req, res) => {
  try {
    const { user_id, message } = req.body;

    await pool.query(
      "INSERT INTO notifications(user_id, message) VALUES($1, $2)",
      [user_id, message]
    );

    res.send("Notification added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// MARK as read
router.put("/:id", async (req, res) => {
  try {
    await pool.query(
      "UPDATE notifications SET is_read=true WHERE id=$1",
      [req.params.id]
    );
    res.send("Marked as read");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;