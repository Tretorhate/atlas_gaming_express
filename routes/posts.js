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

router.use(protect);

router.post("/", validate(schemas.post), createPost);
router.get("/", getPosts);
router.get("/all", adminOnly, getAllPosts);
router.get("/:id", getPost);
router.put("/:id", validate(schemas.post), updatePost);
router.delete("/:id", deletePost);

module.exports = router;
