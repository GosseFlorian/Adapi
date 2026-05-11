import { pool } from "../db/client.js";

export async function getAllThemes(req, res) {
  try {
    const result = await pool.query("SELECT * FROM themes ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getThemeById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM themes WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Theme introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
