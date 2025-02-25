const { validationResult, body } = require("express-validator");

// Middleware to check validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Registration validation rules
exports.registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Login validation rules
exports.loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").exists().withMessage("Password is required"),
];

// Post validation rules
exports.postValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title is required and cannot exceed 100 characters"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required"),
];

// User profile update validation rules
exports.profileUpdateValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("bio").optional().trim(),
];
