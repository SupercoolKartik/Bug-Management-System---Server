import mongoose, { Schema } from "mongoose";

// const userDetailSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: false }
// ); // Disable _id for embedded documents

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
  },
  creatorsId: {
    type: String,
    required: true,
  },
  creatorsFirstName: {
    type: String,
    required: true,
  },
  creatorsLastName: {
    type: String,
    required: true,
  },
  tickets: {
    type: [String],
    default: [],
  },
});

const Project = mongoose.model("project", projectSchema);
export default Project;
