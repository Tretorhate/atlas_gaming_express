const Post = require("../models/Post");
const config = require("../config/config");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      tags: tags || [],
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts for logged-in user
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res, next) => {
  try {
    let query = {};

    // If not admin, only show user's own posts
    if (req.user.role !== config.roles.ADMIN) {
      query.author = req.user.id;
    }

    const posts = await Post.find(query)
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Private
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post or is admin
    if (
      post.author._id.toString() !== req.user.id &&
      req.user.role !== config.roles.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this post",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post or is admin
    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== config.roles.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
    }

    const { title, content, tags } = req.body;

    // Create update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (tags) updateData.tags = tags;
    updateData.updatedAt = Date.now();

    post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("author", "username email");

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user owns the post or is admin
    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== config.roles.ADMIN
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts (admin only)
// @route   GET /api/posts/all
// @access  Private/Admin
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
