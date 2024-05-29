import mongoose, { Schema } from "mongoose";

const user_project_Schema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserProject = mongoose.model("user_project", user_project_Schema);

export default UserProject;
//This schema is imported in route/project.js
