// controllers/skills.controller.js
import { pool } from "../db/client.js";

export async function getAllSkills(req, res) {
  try {
    const result = await pool.query("SELECT * FROM skills ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getSkillById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Skill introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
