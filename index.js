import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello it's the server of BMS!");
});

app.listen(3500, () => {
  console.log("App is listening on http://localhost:3500");
});
