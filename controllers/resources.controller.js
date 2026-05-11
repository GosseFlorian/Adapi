import { pool } from "../db/client.js";

export async function getAllResources(req, res) {
  try {
    const result = await pool.query("SELECT * FROM resources ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
