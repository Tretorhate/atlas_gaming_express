const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../middleware/validation");

const router = express.Router();

// Register route
router.post("/register", registerValidation, validate, register);

// Login route
router.post("/login", loginValidation, validate, login);

module.exports = router;
