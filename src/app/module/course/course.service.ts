/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { CourseSearchFields } from "./course.constant";
import { ICourse } from "./course.interface";
import courseModel from "./course.model";

// * Create Course
const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  payload.complete = false;
  const result = await courseModel.create(payload);
  return result;
};

// * get all user
const getAllCourse = async (filters: any, paginationOptions: any) => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: CourseSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await courseModel
    .find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await courseModel.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// * Get Single Course
const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await courseModel.findById({ _id: id });
  return result;
};

export const CourseService = {
  createCourse,
  getSingleCourse,
  getAllCourse,
};
