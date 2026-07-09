import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Ticket Management System Backend is Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
