import express, { Router } from "express";
import dotenv from "dotenv";
import User from "../schema/users.js";
const router = express.Router();

//ROUTE 1: Create a User using POST api/auth/createuser
router.post("/createuser", async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email }).exec();

    if (user) {
      //400 Bad Request
      return res.status(400).json({ error: "Email is not unique!" });
    }

    user = await User.create(req.body);
    const userId = user._id.toString();
    res.status(201).json({ msg: "User created successfully!", userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2: User Authentication using POST api/auth/login
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.password == req.body.password) {
      const userId = user._id.toString();
      return res
        .status(200)
        .json({ msg: "User logged in successfully!", userId });
    } else return res.status(401).json({ error: "Passwords don't match!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//ROUTE 3: Fetch Logged in user's data, (Login required)
router.get("/getuserdata", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
