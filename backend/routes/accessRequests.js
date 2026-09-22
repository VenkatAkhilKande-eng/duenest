import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * POST /api/access-requests/:id/approve
 * body: { owner_id: number }
 * Calls fn_approve_access_request(request_id, owner_id)
 */
router.post("/:id/approve", async (req, res) => {
  const { id } = req.params;
  await pool.query("SELECT fn_approve_access_request($1,$2)", [id, req.body.owner_id]);
  res.json({ success: true });
});

/**
 * POST /api/access-requests/:id/reject
 * body: { owner_id: number }
 * Calls fn_reject_access_request(request_id, owner_id)
 */
router.post("/:id/reject", async (req, res) => {
  const { id } = req.params;
  await pool.query("SELECT fn_reject_access_request($1,$2)", [id, req.body.owner_id]);
  res.json({ success: true });
});

export default router;
