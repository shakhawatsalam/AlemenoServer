import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ICourse } from "./course.interface";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { CourseService } from "./course.service";
import { paginationFields } from "../../../constants/paginationConstants";
import pick from "../../../shared/pick";
import { CourseFilterableFields } from "./course.constant";

// * Create Course
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { ...courseData } = req.body;
  const result = await CourseService.createCourse(courseData);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Created successfully",
    data: result,
  });
});

//* get all Course
const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CourseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CourseService.getAllCourse(filters, paginationOptions);

  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// * Get Single Course
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CourseService.getSingleCourse(id);

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourse,
};
