import mongoose, { Schema, Document } from "mongoose";

// Define the User interface
export interface IUserAppliedJobs extends Document {
  job_id: string; // UUID string
  user_id: string;
}

// Create the User schema
const UserAppliedJobsSchema: Schema = new Schema<IUserAppliedJobs>({
  job_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: [true, "Name is required"]
  }
});

// Export the model
const UserAppliedJob = mongoose.model<IUserAppliedJobs>("UserAppliedJob", UserAppliedJobsSchema);
export default UserAppliedJob;
