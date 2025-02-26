const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/postController");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/rbac");
const { validate, schemas } = require("../middleware/validation");

const router = express.Router();

// Public routes
router.get("/", getPosts);
router.get("/:id", getPost);

// Protected routes
router.post("/", protect, validate(schemas.post), createPost);
router.get("/all", protect, adminOnly, getAllPosts);
router.put("/:id", protect, validate(schemas.post), updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
