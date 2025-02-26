const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/rbac");
const { validate, schemas } = require("../middleware/validation");

const router = express.Router();

// Apply protect middleware to all routes (requires authentication)
router.use(protect);

// User profile routes (available to authenticated users)
router.get("/profile", getProfile);
router.put("/profile", validate(schemas.profileUpdate), updateProfile);

// Admin-only routes
router.get("/", adminOnly, getAllUsers); // List all users
router.delete("/:id", adminOnly, deleteUser); // Delete a specific user

module.exports = router;
