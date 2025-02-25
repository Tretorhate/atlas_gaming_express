const Joi = require("joi");

// Validation schemas
const schemas = {
  register: Joi.object({
    username: Joi.string().min(3).required().messages({
      "string.min": "Username must be at least 3 characters long",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  }),
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  }),
  post: Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
      "string.min": "Title must be at least 1 character long",
      "string.max": "Title cannot exceed 100 characters",
      "any.required": "Title is required",
    }),
    content: Joi.string().min(1).required().messages({
      "string.min": "Content must be at least 1 character long",
      "any.required": "Content is required",
    }),
    tags: Joi.array().items(Joi.string()).optional(),
  }),
  profileUpdate: Joi.object({
    username: Joi.string().min(3).optional().messages({
      "string.min": "Username must be at least 3 characters long",
    }),
    email: Joi.string().email().optional().messages({
      "string.email": "Please provide a valid email address",
    }),
    bio: Joi.string().optional(),
  }).or("username", "email", "bio"), // At least one field must be provided
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errorMessages,
      });
    }
    next();
  };
};

module.exports = {
  validate,
  schemas,
};
