import express from "express";
import cors from "cors";
import { routes } from "./routes/routes.js";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(routes);

export default app;
