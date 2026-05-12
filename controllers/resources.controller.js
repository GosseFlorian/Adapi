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

// TODO: faire le POST avec check pour le type (enum)
export async function createResource(req, res) {
  const resourceType = ["guide", "video", "exercise", "projet"];
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
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Le champ resources est requis (string)" });
    }

    const result = await pool.query(
      "UPDATE resources SET title = $1 WHERE id = $2 RETURNING *",
      [title, id],
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
