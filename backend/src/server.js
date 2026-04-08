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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sanitize = (val) => String(val || "").trim().replace(/[<>"'`]/g, "");

app.post("/api/contact", (req, res) => {
  const { fullName, email, company, message } = req.body;

  const missing = [];
  if (!fullName) missing.push("fullName");
  if (!email) missing.push("email");
  if (!message) missing.push("message");

  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      message: `The following fields are required: ${missing.join(", ")}.`,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      message: "Please provide a valid email address.",
    });
  }

  const cleanPayload = {
    fullName: sanitize(fullName),
    email: sanitize(email).toLowerCase(),
    company: sanitize(company),
    message: sanitize(message),
    createdAt: new Date().toISOString(),
  };

  console.log("New contact request:", cleanPayload);

  return res.status(201).json({
    ok: true,
    message: "Thank you. We will get back to you shortly.",
  });
});

app.post("/api/inquiry", (req, res) => {
  const { name, email, phone, country, date, hours, mins, zone } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      ok: false,
      message: "Name and email are required.",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      message: "Please provide a valid email address.",
    });
  }

  const cleanPayload = {
    name: sanitize(name),
    email: sanitize(email).toLowerCase(),
    phone: sanitize(phone),
    country: sanitize(country),
    date: sanitize(date),
    hours: sanitize(hours),
    mins: sanitize(mins),
    zone: sanitize(zone),
    createdAt: new Date().toISOString(),
  };

  console.log("New service inquiry:", cleanPayload);

  return res.status(201).json({
    ok: true,
    message: "Thank you for your inquiry! We will contact you shortly.",
  });
});

app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ ok: false, message: "Email address is required." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, message: "Please provide a valid email address." });
  }

  console.log("Newsletter subscription:", {
    email: sanitize(email).toLowerCase(),
    subscribedAt: new Date().toISOString(),
  });

  return res.status(201).json({
    ok: true,
    message: "You're subscribed! Thank you for signing up.",
  });
});

app.listen(PORT, () => {
  console.log(`Shefware API listening on port ${PORT}`);
});
