import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// Reads PG* vars from .env automatically
export const pool = new Pool();

// quick sanity check (optional)
// pool.query("select 1").then(() => console.log("DB ok")).catch(console.error);
