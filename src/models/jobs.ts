import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  creator_id: String,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;