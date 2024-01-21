import mongoose, { Model, Schema } from "mongoose";
import { ICourse } from "./course.interface";


const CourseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: {
      type: String,
      enum: ["Open", "Closed", "In Progress"],
      required: true,
    },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: { type: [String], required: true },
    complete: { type: Boolean },
    syllabus: [
      {
        week: { type: Number, required: true },
        topic: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const courseModel: Model<ICourse> = mongoose.model("Course", CourseSchema);

export default courseModel;
