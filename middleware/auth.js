const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      // Fetch full user object instead of just ID
      req.user = await User.findById(decoded.id).select("-password"); // Exclude password
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  } catch (error) {
    next(error);
  }
};
