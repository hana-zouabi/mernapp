const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected (Atlas)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use("/api/persons", require("./Routes/PersonRoutes"));

// Serve React static files
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// React fallback for unmatched routes
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"), (err) => {
      if (err) next(err);
    });
  } else {
    next();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
