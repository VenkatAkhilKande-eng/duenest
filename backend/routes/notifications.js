import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET /api/notifications/:userId
 * -> Unread notifications for the user
 * Used by: Navbar bell + Notifications page
 */
router.get("/:userId", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM notifications WHERE user_id = $1 AND is_read = false ORDER BY created_at DESC",
    [req.params.userId]
  );
  res.json(result.rows);
});

/**
 * POST /api/notifications/:notifId/read
 * -> Mark a single notification as read
 */
router.post("/:notifId/read", async (req, res) => {
  await pool.query("UPDATE notifications SET is_read = true WHERE id = $1", [req.params.notifId]);
  res.json({ success: true });
});

// DELETE /api/notifications/:notifId
// -> Permanently delete one notification (verifies user ownership)
router.delete("/:notifId", async (req, res) => {
  const { notifId } = req.params;
  const { user_id } = req.body || {};

  try {
    // Optional safety check: ensure this notification belongs to the caller
    if (user_id) {
      const check = await pool.query(
        "SELECT 1 FROM notifications WHERE id=$1 AND user_id=$2",
        [notifId, user_id]
      );
      if (check.rowCount === 0) {
        return res.status(404).json({ success: false, error: "Not found" });
      }
    }

    await pool.query("DELETE FROM notifications WHERE id = $1", [notifId]);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Failed to delete notification" });
  }
});


export default router;
