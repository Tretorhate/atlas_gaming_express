require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

const app = express();

connectDB();

// CORS: Use environment variable for frontend URL in production
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL // e.g., "https://your-frontend-app.com"
    : "http://localhost:3000";
app.use(cors({ origin: allowedOrigin }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`Test it at: http://localhost:${PORT}`);
});
