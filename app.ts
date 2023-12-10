import express, { Application, Request, Response } from "express";
import user from "./routes/user";
import workspace from "./routes/space";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app: Application = express();

app.use(
  cors<Request>({
    origin: [
      "http://localhost:3000",
      "https://worknoon.vercel.app",
      "https://worknoon-chisomije92.vercel.app",
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cookieParser());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("OK");
});

app.use("/api/user", user);
app.use("/api/space", workspace);

export default app;
