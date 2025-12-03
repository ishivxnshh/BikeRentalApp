
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Auth routes
app.use("/api/auth", require("./src/routes/auth.routes"));
// Onboarding routes
app.use("/api/onboarding", require("./src/routes/onboarding.routes"));

// Vehicles routes
app.use("/api/vehicles", require("./src/routes/vehicles.routes"));
// EV routes
app.use("/api/ev", require("./src/routes/ev.routes"));
// Rental Plans routes
app.use("/api/rental-plans", require("./src/routes/rentalPlans.routes"));
// Dashboard routes
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));
// Issues routes
app.use("/api/issues", require("./src/routes/issues.routes"));
// Map routes
app.use("/api/map", require("./src/routes/map.routes"));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

module.exports = app;
