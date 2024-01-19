import express from "express";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post("/", CourseController.createCourse);
router.get("/", CourseController.getAllCourse);
router.get("/:id", CourseController.getSingleCourse);

export const CourseRoute = router;
