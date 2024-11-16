import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;


app.get("/", (req: Request, res: Response) => {
  res.send("gymU asset service");
});

app.listen(port, () => {
  console.log(`[asset service]: Server is running at http://localhost:${port}`);
});