import { ICourse } from "./course.interface";
import courseModel from "./course.model";

// * Create User
const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const result = await courseModel.create(payload);
  return result;
};

export const CourseService = {
  createCourse,
};
