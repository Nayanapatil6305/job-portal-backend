const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    status: true,
    message: "Job Portal API working"
  });
});

module.exports = router;