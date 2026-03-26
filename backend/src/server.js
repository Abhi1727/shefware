const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URLS =
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173";
const allowedOrigins = FRONTEND_URLS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl/health checks) and configured web origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "shefware-api" });
});

app.post("/api/contact", (req, res) => {
  const { fullName, email, company, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "fullName, email and message are required.",
    });
  }

  const cleanPayload = {
    fullName: String(fullName).trim(),
    email: String(email).trim().toLowerCase(),
    company: String(company || "").trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  console.log("New contact request:", cleanPayload);

  return res.status(201).json({
    ok: true,
    message: "Thank you. We will get back to you shortly.",
  });
});

app.listen(PORT, () => {
  console.log(`Shefware API listening on port ${PORT}`);
});
