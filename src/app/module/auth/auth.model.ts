import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  enRolledCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const User = model<IUser, UserModel>("User", UserSchema);

export default User;
