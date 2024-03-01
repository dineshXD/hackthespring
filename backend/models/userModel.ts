import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export interface UserDocument extends Document {
  // Define user properties here (same as in the schema)
  email: string;
  password: string;
  confirmPassword: string;
  role: "patient" | "doctor"; // Define enum values as a union type
  // Other properties...
}
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
  },
  email: {
    type: String,
    required: [true, "Please enter valid email id"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter valid password"],
    minLength: 8,
    maxLength: 16,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
    select: false,
    validate: {
      validator: function (el: string): boolean {
        return el === (this as any).password;
      },
      message: "Please enter same as password",
    },
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
    required: true,
  },
  specializations: String,
});
userSchema.pre("save", async function (next: NextFunction) {
  this.password = await bcrypt.hash(this.password, 12);
  (this as any).confirmPassword = undefined;
  next();
});
const User = mongoose.model("User", userSchema);
export { User };
