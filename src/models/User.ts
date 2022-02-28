import { Schema, model, Model, Document } from "mongoose";
import { DocumentResult } from "./DocumentResult";

export interface IUser extends Document, DocumentResult<IUser> {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: Model<IUser> = model("User", UserSchema);
