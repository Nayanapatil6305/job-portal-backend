const express = require("express");

const router = express.Router();
// GET Api
router.get("/test", (req, res) => {
  res.json({
    status: true,
    message: "Job Portal API working"
  });
});

// Post Api
router.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  await pool.query(
    "INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4)",
    [name, email, password, role]
  );

  res.send("User added");
});

module.exports = router;