import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  creatorsId: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    default: [],
  },
  tickets: {
    type: [String],
    default: [],
  },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
