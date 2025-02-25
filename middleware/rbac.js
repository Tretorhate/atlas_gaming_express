const config = require("../config/config");

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== config.roles.ADMIN) {
    return res.status(403).json({
      success: false,
      message: "This route is restricted to admin users",
    });
  }
  next();
};
