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

export async function createResourceSkill(req, res) {
  try {
    const { resource_id, skill_id } = req.body;

    if (
      !resource_id ||
      typeof resource_id !== "number" ||
      !skill_id ||
      typeof skill_id !== "number"
    ) {
      return res.status(400).json({
        error: "Les champs resource_id et skill_id sont requis (number).",
      });
    }

    const result = await pool.query(
      "INSERT INTO resources_skills (resource_id, skill_id) VALUES ($1, $2) RETURNING *",
      [resource_id, skill_id],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteResourceSkill(req, res) {
  try {
    const { resource_id, skill_id } = req.params;
    const result = await pool.query(
      "DELETE FROM resources_skills WHERE resource_id = $1 AND skill_id = $2 RETURNING *",
      [resource_id, skill_id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Liaison introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
