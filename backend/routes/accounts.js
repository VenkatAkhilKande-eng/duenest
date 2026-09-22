import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// List accounts for a user (you already had this)
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query(`
    SELECT a.*, am.role, am.status
    FROM account_members am
    JOIN accounts a ON a.id = am.account_id
    WHERE am.user_id = $1
    ORDER BY a.id ASC
  `, [userId]);
  res.json(result.rows);
});

// NEW: list pending requests for an account (owner view)
router.get("/:accountId/requests", async (req, res) => {
  const { accountId } = req.params;
  const result = await pool.query(`
    SELECT ar.*, u.full_name AS requester_name
    FROM access_requests ar
    JOIN users u ON u.id = ar.requester_id
    WHERE ar.account_id = $1 AND ar.status = 'pending'
    ORDER BY ar.created_at ASC
  `, [accountId]);
  res.json(result.rows);
});

// NEW: create a join request for a family account
router.post("/:accountId/request", async (req, res) => {
  const { accountId } = req.params;
  const { requester_id, message } = req.body;

  try {
    // Check if requester is already an owner of this family account
    const ownerCheck = await pool.query(
      `SELECT 1 FROM account_members 
       WHERE account_id=$1 AND user_id=$2 AND role='owner' AND status='active'`,
      [accountId, requester_id]
    );
    if (ownerCheck.rows.length) {
      return res
        .status(400)
        .json({ success: false, error: "You are already the owner of this family account and cannot request access." });
    }

    // Continue with request if not owner
    await pool.query("SELECT fn_request_family_access($1,$2,$3)", [
      accountId,
      requester_id,
      message || null,
    ]);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});


// NEW: list members of an account (owner view, but can be reused)
router.get("/:accountId/members", async (req, res) => {
  const { accountId } = req.params;
  try {
    const result = await pool.query(`
      SELECT am.id, am.user_id, am.role, am.status,
             u.full_name, u.email
      FROM account_members am
      JOIN users u ON u.id = am.user_id
      WHERE am.account_id = $1
      ORDER BY am.role DESC, u.full_name
    `, [accountId]);

    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

// NEW: remove a member from an account (owner only)
router.delete("/:accountId/members/:userId", async (req, res) => {
  const { accountId, userId } = req.params;
  try {
    // Ensure we don't let owners remove themselves accidentally
    const roleCheck = await pool.query(
      `SELECT role FROM account_members WHERE account_id=$1 AND user_id=$2`,
      [accountId, userId]
    );
    if (roleCheck.rows.length && roleCheck.rows[0].role === "owner") {
      return res.status(400).json({ error: "Owner cannot be removed" });
    }

    // Delete the membership
    await pool.query(
      `DELETE FROM account_members WHERE account_id=$1 AND user_id=$2`,
      [accountId, userId]
    );

    res.json({ success: true, message: "Member removed successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to remove member" });
  }
});



export default router;
