import express, { Router } from "express";
import dotenv from "dotenv";
import User from "../schema/users.js";
const router = express.Router();

router.get("/getusers", (req, res) => {
  res.send("This route is working");
});

router.post("/createuser", async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email }).exec();

    if (user) {
      //400 Bad Request
      return res.status(400).json({ error: "Email is not unique!" });
    }

    user = User.create(req.body);
    res.send("User created successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
