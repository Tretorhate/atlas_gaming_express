const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/rbac");
const {
  profileUpdateValidation,
  validate,
} = require("../middleware/validation");

const router = express.Router();

// Protect all routes
router.use(protect);

// User profile routes
router.get("/profile", getProfile);
router.put("/profile", profileUpdateValidation, validate, updateProfile);

// Admin routes
router.get("/", adminOnly, getAllUsers);
router.delete("/:id", adminOnly, deleteUser);

module.exports = router;
