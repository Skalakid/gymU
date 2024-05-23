import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Client, Pool } from "pg";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  database: process.env.DB_SCHEMA,
});

(async () => {
  try {
    const { rows } = await pool.query("SELECT current_user");
    const current_user = rows[0]["current_user"];
    console.log(current_user + "log");
  } catch (error) {
    console.error(error);
  }
})();

app.get("/", (req: Request, res: Response) => {
  res.send("Basic Node server with TypeScript");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
