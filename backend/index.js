import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

import accountsRouter from "./routes/accounts.js";
import subsRouter from "./routes/subscriptions.js";
import notifsRouter from "./routes/notifications.js";
import accessRequestsRouter from "./routes/accessRequests.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// health
app.get("/", (_req, res) => res.send("SubTracker API ✅"));
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.use("/api/accounts", accountsRouter);
app.use("/api/subscriptions", subsRouter);
app.use("/api/notifications", notifsRouter);
app.use("/api/access-requests", accessRequestsRouter);
app.use("/api/auth", authRouter);

// error fallback (optional)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
