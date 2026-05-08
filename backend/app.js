import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import newsletterRouter from "./router/newsletterRouter.js";
import cors from "cors";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/newsletter", newsletterRouter);

dbConnection();

export default app;