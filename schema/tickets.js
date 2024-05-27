import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  summary: {
    type: String,
    required: true,
  },
  //   issueType: {
  //     type: String,
  //     required: true,
  //     enum: ["Bug", "Task", "Story", "Epic", "Improvement"],
  //   },
  description: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["To Do", "In Progress", "Done"],
  },
  reporterId: {
    type: String,
    required: true,
  },
  assigneeId: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
  },
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
});

const Ticket = mongoose.model("ticket", ticketSchema);
export default Ticket;
