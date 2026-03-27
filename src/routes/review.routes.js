const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET reviews
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reviews");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ADD review
router.post("/", async (req, res) => {
  try {
    const { user_id, company_id, rating, comment } = req.body;

    await pool.query(
      "INSERT INTO reviews(user_id, company_id, rating, comment) VALUES($1,$2,$3,$4)",
      [user_id, company_id, rating, comment]
    );

    res.send("Review added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE review
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.id]);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;