import express, { Router } from "express";
import dotenv from "dotenv";
import Project from "../schema/projects.js";
import UserProject from "../schema/user_project.js";
import mongoose from "mongoose";
const router = express.Router();

//ROUTE 1: Route to CREATE A PROJECT
router.post("/createproject", async (req, res) => {
  try {
    await Project.create(req.body);
    res.status(201).json({ msg: "Project created successfully" });
    //-------------->Some changes might be done in case we need to add users along with creating users
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2: Route to FETCH ALL PROJECTS of a particular user
router.get("/fetchallprojects/:uId", async (req, res) => {
  try {
    const projects = await UserProject.find({ userId: req.params.uId });
    if (projects.length === 0) {
      return res
        .status(404)
        .json({ error: "There are no projects created by you!" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 3: Route to ADD USERS TO THE PROJECT / ADDING IN THE USER_PROJECT TABLE
router.post("/addusers", async (req, res) => {
  const userProjects = req.body; // Assuming body contains an array of user projects

  try {
    const insertedDocuments = await UserProject.insertMany(userProjects);
    res
      .status(200)
      .json({ msg: "Users added successfully!", data: insertedDocuments });
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

//ROUTE 5: Route to FETCH PROJECT DATA, (Login required)
router.get("/getprojectdata/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    } //This if statement will probably never be used
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 6: Route to FETCH ALL USERS of a particular project
router.get("/fetchallusers/:pId", async (req, res) => {
  try {
    const users = await UserProject.find({ projectId: req.params.pId });
    //------>Users might be duplicated(Fix that if needed)
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "There are no users in this project!" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//ROUTE 7: Route to DELETE the Project (and all entries in UserProject table with that projectId)(Login Required)
router.delete("/deleteproject/:pId", async (req, res) => {
  try {
    // Check if the Project with the provided id exists
    let project = await Project.findById(req.params.pId);
    if (!project) {
      return res.status(404).json({ msg: "No project found with that ID" });
    }

    // Find the project to be Deleted and Delete it
    project = await Project.findByIdAndDelete(req.params.pId);

    //Deleting every entry in the UserProject table(if any) with the provided project id
    const result = await UserProject.deleteMany({ projectId: req.params.pId });

    res
      .status(200)
      .json({ Success: "The project has been deleted", project: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
