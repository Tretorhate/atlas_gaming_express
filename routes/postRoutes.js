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
const { postValidation, validate } = require("../middleware/validation");

const router = express.Router();

// Protect all routes
router.use(protect);

// Post routes
router.post("/", postValidation, validate, createPost);
router.get("/", getPosts);
router.get("/all", adminOnly, getAllPosts);
router.get("/:id", getPost);
router.put("/:id", postValidation, validate, updatePost);
router.delete("/:id", deletePost);

module.exports = router;
