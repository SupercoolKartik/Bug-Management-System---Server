import express, { Router } from "express";
import dotenv from "dotenv";
import User from "../schema/users.js";

const router = express.Router();

router.get("/getusers", (req, res) => {
  res.send("This route is working");
});

export default router;
