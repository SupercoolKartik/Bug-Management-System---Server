import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

import connectToMongo from "./db.js";
connectToMongo();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello it's the server of BMS!");
});

app.post("/createuser", (req, res) => {
  res.send(req.body.somedata);
});

import authRouter from "./routes/auth.js";
app.use("/api/auth", authRouter);

import projectsRouter from "./routes/project.js";
app.use("/api/projects", projectsRouter);

import ticketsRouter from "./routes/ticket.js";
app.use("/api/tickets", ticketsRouter);

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
