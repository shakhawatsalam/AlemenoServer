/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/Apierror";
import { IUser } from "./auth.interface";
import User from "./auth.model";
import bcrypt from "bcrypt";
import { JwtHelper } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import courseModel from "../course/course.model";

const signup = async (payload: IUser): Promise<IUser> => {
  const user = await User.findOne({ email: payload.email });

  // checking Email is already used or not
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "User is already used");
  }

  const { email, password, name } = payload;

  const hash = await bcrypt.hash(password, 12);

  const createPayload = {
    name,
    email,
    password: hash,
  };

  const result = await User.create(createPayload);
  return result;
};
export type ILogin = {
  email: string;
  password: string;
};
const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Not Found");
  }

  if (user) {
    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password not matched");
    }

    const accessToken = JwtHelper.createToken(
      { id: user._id, email: user.email },
      config.jwt.secret as Secret,
      "30d"
    );

    return {
      accessToken,
    };
  }
};
const enroll = async (userId: string, courseId: string) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Find the course by ID
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }
    // Check if the course is already enrolled
    if (
      user.enRolledCourse.some(
        (enrolledCourse) => String(enrolledCourse) === String(course._id)
      )
    ) {
      // Course is already enrolled, you can handle this as needed
      throw new ApiError(httpStatus.BAD_REQUEST, "Course is already enrolled");
    }
    // Add additional fields to the course before pushing it
    const courseToAdd = {
      ...course.toObject(), // Convert Mongoose document to plain JavaScript object
      complete: false,
   
    };


    // Add the course to the user's enRolledCourse array
    user.enRolledCourse.push(courseToAdd);

    // Save the updated user document
    await user.save();
  } catch (errors: any) {
    throw new ApiError(httpStatus.NOT_FOUND, errors);
  }
};

const myCourse = async (userId: string) => {
  try {
    // Find the user by ID and populate the enRolledCourse array
    const user = await User.findById(userId).populate("enRolledCourse");

    if (!user) {
      throw new Error("User not found");
    }

    // Access the enrolled courses
    const enrolledCourses = user.enRolledCourse;

    // Do something with the enrolled courses (e.g., log or return them)
    return enrolledCourses;

    // If you want to return the enrolled courses, you can do:
    // return enrolledCourses;
  } catch (error: any) {
    console.error("Error retrieving enrolled courses:", error.message);
    // Handle the error accordingly
  }
};

export const AuthService = {
  signup,
  loginUser,
  enroll,
  myCourse,
};
