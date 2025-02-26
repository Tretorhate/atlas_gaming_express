const jwt = require("jsonwebtoken");
const config = require("../config/config");

const restrictLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader); // Debug log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid token, allowing register");
    return next(); // No token or malformed, allow access
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log("Decoded:", decoded); // Should show { id: "...", role: "user" or "admin", iat: ..., exp: ... }
    req.user = decoded;

    if (req.user.role === "admin") {
      console.log("Admin detected, allowing register");
      return next();
    }

    console.log("Non-admin user detected, blocking register");
    return res.status(403).json({
      success: false,
      message: "Authenticated users cannot register. Logout first.",
    });
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return next(); // Invalid token, allow access
  }
};

module.exports = restrictLoggedIn;
