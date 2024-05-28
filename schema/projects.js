import mongoose, { Schema } from "mongoose";

const userDetailSchema = new Schema(
  {
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
); // Disable _id for embedded documents

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  creatorsId: {
    type: String,
    required: true,
  },
  creatorsName: {
    type: String,
    required: true,
  },
  users: {
    //storing user information in the users field as a map of user IDs to user details
    type: Map,
    of: userDetailSchema,
    default: {},
  },
  tickets: {
    type: [String],
    default: [],
  },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
