import express from "express";
import db from "./data/database.js";
const PORT = 8005;
const app = express();
app.use(express.json());

app.get("/champs", (req, res) => {
  const champs = db.prepare(`SELECT * FROM lolchamps`).all();
  return res.status(200).json(champs);
});

app.get("/champs/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const champ = db.prepare(`SELECT * FROM lolchamps WHERE id=?`).get(id);
  if (!champ) {
    return res.status(404).json({ message: "Champs nem található" });
  }
  return res.status(200).json(champ);
});

app.post("/champs", (req, res) => {
  const {
    name,
    role,
    lane,
    difficulty,
    blue_essence,
    damage_type,
    description,
  } = req.body;
  if (
    !name ||
    !role ||
    !lane ||
    !difficulty ||
    !blue_essence ||
    !damage_type ||
    !description
  ) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const newchamp = db
    .prepare(
      `INSERT INTO lolchamps (name, role, lane, difficulty, blue_essence, damage_type, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(name, role, lane, difficulty, blue_essence, damage_type, description);
  return res.status(201).json({ message: "Sikeresen létrehozva", newchamp });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  db.prepare(`INSERT INTO users (username,password) VALUES(?,?)`).run(
    username,
    password,
  );
  return res.status(201).json({ message: "Sikeres bejelentkezés" });
});

app.delete("/champs/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const champ = db.prepare(`SELECT * FROM lolchamps WHERE id=?`).get(id);
  if (!champ) {
    return res.status(404).json({ message: "Nem található" });
  }
  db.prepare(`DELETE FROM lolchamps WHERE id = ?`).run(id);
  return res.status(200).json({ message: "Sikeresen törölve" });
});

app.listen(PORT, () => {
  console.log(`A szerver fut ezen a porton ${PORT}`);
});
