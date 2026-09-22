import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// POST /api/auth/register
// body: { full_name, email, password, account_choice: 'personal'|'family', family_name?: string }
router.post("/register", async (req, res) => {
  const { full_name, email, password, account_choice, family_name } = req.body;

  if (!full_name || !email || !password || !account_choice) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!["personal", "family"].includes(account_choice)) {
    return res.status(400).json({ error: "Invalid account_choice" });
  }

  try {
    // 1) ensure user email is unique
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // 2) create user
    const hash = await bcrypt.hash(password, 10);
    const userRes = await pool.query(
      `INSERT INTO users (email, full_name, password_hash)
       VALUES ($1,$2,$3) RETURNING id, full_name, email`,
      [email, full_name, hash]
    );
    const user = userRes.rows[0];
    // NOTE: your trigger already made a personal account + owner membership for this user

    // 3) If they chose family, create a family account and make them owner
    let createdFamily = null;
    if (account_choice === "family") {
      if (!family_name || !family_name.trim()) {
        return res.status(400).json({ error: "family_name is required for family account" });
      }

      // avoid duplicate family account names for the same creator
      const dupCheck = await pool.query(
        `SELECT id FROM accounts
         WHERE account_type='family' AND created_by=$1 AND LOWER(name)=LOWER($2)`,
        [user.id, family_name.trim()]
      );
      if (dupCheck.rows.length) {
        return res.status(409).json({ error: "You already have a family account with this name" });
      }

      const fam = await pool.query(
        `INSERT INTO accounts (account_type, name, created_by)
         VALUES ('family', $1, $2)
         RETURNING id, name, account_type, created_by`,
        [family_name.trim(), user.id]
      );
      const famAcc = fam.rows[0];

      // make user owner of this family account
      await pool.query(
        `INSERT INTO account_members (account_id, user_id, role, status)
         VALUES ($1,$2,'owner','active')
         ON CONFLICT (account_id, user_id) DO UPDATE SET role='owner', status='active'`,
        [famAcc.id, user.id]
      );

      createdFamily = famAcc;
    }

    // 4) issue a JWT
    const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user,
      token,
      family: createdFamily,
      message:
        account_choice === "family"
          ? "Registered and created family account as owner"
          : "Registered with personal account",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
// body: { email, password }
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const u = await pool.query("SELECT id, email, full_name, password_hash FROM users WHERE email=$1", [email]);
    if (!u.rows.length) return res.status(401).json({ error: "Invalid credentials" });

    const user = u.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, full_name: user.full_name, email: user.email }, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
