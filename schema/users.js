import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
