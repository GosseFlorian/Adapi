// index.js
import "dotenv/config";
import express from "express";
import skillsRouter from "./routes/skills.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/skills", skillsRouter);

app.listen(port, () => {
  console.log(`API sur <http://localhost>:${port}`);
});
