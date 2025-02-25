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

router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", validate(schemas.profileUpdate), updateProfile);
router.get("/", adminOnly, getAllUsers);
router.delete("/:id", adminOnly, deleteUser);

module.exports = router;
