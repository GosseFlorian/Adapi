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

export async function getResourceById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM resources WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Resource introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
