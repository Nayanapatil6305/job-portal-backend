
const crypto = require("crypto");
const pool = require('../config/db');

const bcrypt = require('bcryptjs');

// Registration
const register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered", user: result.rows[0] });

  } catch (err) {
    if (err.code === '23505') { // duplicate email
      res.status(400).json({ error: "Email already registered" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }


};

const forgotPassword = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await pool.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)",
      [user.id, token, expires]
    );

    res.json({
      message: "Reset token generated",
      token: token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Reset Password
const resetPassword = async (req, res) => {
  
};


module.exports = { register, login ,forgotPassword,resetPassword};