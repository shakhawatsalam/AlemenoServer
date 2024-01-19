import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ICourse } from "./course.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { CourseService } from "./course.service";

// * Create User
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...courseData } = req.body;
  const result = await CourseService.createCourse(courseData);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
};
