import { pool } from "../db/client.js";

export async function getAllResourcesSkills(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM resources_skills ORDER BY resource_id, skill_id",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
