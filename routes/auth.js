import express, { Router, application } from "express";
import dotenv from "dotenv";

const router = express.Router();

router.get("/getusers", (req, res) => {
  console.log("step2");
  res.send("Woeking");
});

export default router;
