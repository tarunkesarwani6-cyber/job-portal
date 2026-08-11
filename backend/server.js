//auto deploy trst
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedRoutes = require("./routes/savedRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require(
  "./routes/notificationRoutes"
);
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

  })
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use(
  "/api/notifications",
  notificationRoutes
);
// Connect Database
connectDB();
  app.get("/", (req, res) => {
  res.send("Backend Working ");
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.post("/test", (req, res) => {
  res.json({ message: "POST works" });
});
// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/analytics", analyticsRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Listening on all interfaces");
});