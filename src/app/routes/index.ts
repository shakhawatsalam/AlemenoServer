import express from "express";
import { CourseRoute } from "../module/course/course.routes";
import { AuthRoutes } from "../module/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: AuthRoutes,
  },
  {
    path: "/course",
    route: CourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
