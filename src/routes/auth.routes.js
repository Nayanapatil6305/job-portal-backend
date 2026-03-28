const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth.controller');
const {
//   register,
//   login,
  forgotPassword,
  resetPassword
} = require('../controller/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
