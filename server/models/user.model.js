import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const userSchema = mongoose.Schema({
  user: {
    type: String,
    requird: true,
    minLength: [3, "Name must be more than 3 chars long"],
    maxLength: 50,
  },
  email: {
    type: String,
    requird: true,
    minLength: [3, "Email must be more than 3 chars long"],
    maxLength: 50,
  },
  password: {
    type: String,
    requird: true,
    minLength: [6, "Password must be more than 3 chars long"],
    maxLength: 250,
    match: [/\S+\@\S+\.\S+/, "Invalid Email Address"],
  },
});
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, JWT_SECRET, expiresIn: "2d" });
};
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
