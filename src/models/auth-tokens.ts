import mongoose, { Schema, Document } from "mongoose";

export interface IAuthToken extends Document {
  token: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthTokenSchema: Schema = new Schema<IAuthToken>(
  {
    token: {
      type: String,
      required: true,
    },
    user_id: {
      type: String, // or `mongoose.Schema.Types.ObjectId` if you're referencing the User collection
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    collection: "auth_tokens", // optional: explicitly name the collection
  }
);

const AuthToken = mongoose.model<IAuthToken>("AuthToken", AuthTokenSchema);
export default AuthToken;
