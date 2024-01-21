import { Model } from "mongoose";
import { ICourse } from "../course/course.interface";

export type IUser = {
  name: string;
  email: string;
  password: string;
  enRolledCourse: ICourse[];
};

export type UserModel = Model<IUser, Record<string, unknown>>;
