import express from "express";
import { UserRoute } from "../module/user/user.route";
import { TeamRoutes } from "../module/team/team.routes";
import { CourseRoute } from "../module/course/course.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/teams",
    route: TeamRoutes,
  },
  {
    path: "/course",
    route: CourseRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
