import { pool } from "../db/client.js";
const resourceType = ["guide", "video", "exercise", "projet"];

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

export async function createResource(req, res) {
  try {
    const { title, type } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ title est requis (string)" });
    }

    if (!resourceType.includes(type)) {
      return res.status(400).json({
        error:
          "Le type doit faire partie de la liste (guide, video, exercise, projet)",
      });
    }

    const result = await pool.query(
      "INSERT INTO resources (title, type) VALUES ($1, $2) RETURNING *",
      [title, type],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function updateResource(req, res) {
  try {
    const { id } = req.params;
    const { title, type } = req.body;

    if (
      (!title || typeof title !== "string") &&
      (!type || typeof type !== "string")
    ) {
      return res.status(400).json({
        error: "Au moins un champ valide (title ou type) est requis (string).",
      });
    }

    if (type && !resourceType.includes(type)) {
      return res.status(400).json({
        error:
          "Le type doit faire partie de la liste (guide, video, exercise, projet)",
      });
    }

    // La requête utilise COALESCE pour chaque champ facultatif
    const result = await pool.query(
      "UPDATE resources SET title = COALESCE($1, title), type = COALESCE($2, type) WHERE id = $3 RETURNING *",
      [title || null, type || null, id], // On force null si c'est absent
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Resource introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function deleteResource(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM resources WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Resource introuvable" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
