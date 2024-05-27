import express, { Router } from "express";
import dotenv from "dotenv";
import Project from "../schema/projects.js";
import mongoose from "mongoose";
const router = express.Router();

//ROUTE 1: Route to CREATE A PROJECT
router.post("/createproject", async (req, res) => {
  try {
    await Project.create(req.body);
    res.json({ msg: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2: Route to FETCH ALL PROJECTS
router.get("/fetchallprojects/:id", async (req, res) => {
  try {
    const projects = await Project.find({ creatorsId: req.params.id });
    if (projects.length === 0) {
      return res
        .status(404)
        .json({ error: "There are no projects created by you!" });
    }
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 3: Route to ADD A USER to the users array in a project
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

    res.status(200).json({ msg: "User is/Users are added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 4: Route to ADD A TICKET to the tickets array in a project
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

    res.status(200).json({ msg: "Ticket is added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 5: Route to DELETE the Project (Login Required)
router.delete("/deleteproject/:id", async (req, res) => {
  try {
    // Check if the Project with the provided id exists
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "No project found with that ID" });
    }

    // Find the project to be Deleted and Delete it
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ Success: "The note has been deleted", project: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
