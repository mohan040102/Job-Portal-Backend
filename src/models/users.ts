import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  _id: string; // UUID string
  name: string;
  email: string;
  password: string;
  user_type: "employer" | "jobseeker";
}

// Create the User schema
const UserSchema: Schema = new Schema<IUser>({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  user_type: {
    type: String,
    enum: ["employer", "jobseeker"],
    required: [true, "User type is required"]
  }
});

// Export the model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
