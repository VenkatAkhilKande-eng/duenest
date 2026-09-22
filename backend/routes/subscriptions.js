import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET /api/subscriptions/account/:accountId
 * -> List subscriptions for an account
 * Used by: Dashboard.jsx
 */
router.get("/account/:accountId", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM subscriptions WHERE account_id = $1 ORDER BY next_due_date",
    [req.params.accountId]
  );
  res.json(result.rows);
});

/**
 * POST /api/subscriptions/account/:accountId
 * body: { service_name, amount_cents, frequency, next_due_date }
 * -> Create a new subscription
 * Used by: AddSubscriptionForm
 */
router.post("/account/:accountId", async (req, res) => {
  const { service_name, amount_cents, frequency, next_due_date, category, notes } = req.body;

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  const result = await pool.query(
    `INSERT INTO subscriptions (account_id, service_name, amount_cents, frequency, next_due_date, category, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [req.params.accountId, service_name, amount_cents, frequency, next_due_date, category, notes || null]
  );
  res.json(result.rows[0]);
});

export default router;
