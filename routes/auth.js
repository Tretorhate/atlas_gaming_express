// routes/auth.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const { validate, schemas } = require("../middleware/validation");
const restrictLoggedIn = require("../middleware/restrictLoggedIn");

const router = express.Router();

router.post(
  "/register",
  restrictLoggedIn,
  validate(schemas.register),
  register
);
router.post("/login", validate(schemas.login), login);

module.exports = router;
