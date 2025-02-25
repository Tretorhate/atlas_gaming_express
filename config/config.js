module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: "24h",
  roles: {
    USER: "user",
    ADMIN: "admin",
  },
};
