import express, { Router } from "express";
import dotenv from "dotenv";
import Project from "../schema/projects.js";
import mongoose from "mongoose";
const router = express.Router();

//Route to create a project
router.post("/createproject", async (req, res) => {
    try{
      await Project.create(req.body);
      res.send("Project created successfully");
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to add a new user to the users array in a project
router.put("/adduser", async (req, res) => {
  const { projectId, userId } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(projectId);
    const updatedProject = await Project.findByIdAndUpdate(
      objectId,
      { $addToSet: { users: userId } }, // Use $addToSet to avoid duplicates
      { new: true, useFindAndModify: false }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new Ticket to the tickets array in a project
router.put("/addticket", async (req, res) => {
  const { projectId, ticketId } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(projectId);
    const updatedProject = await Project.findByIdAndUpdate(
      objectId,
      { $addToSet: { tickets: ticketId } }, // Use $addToSet to avoid duplicates
      { new: true, useFindAndModify: false }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
