"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_routes_1 = require("../module/course/course.routes");
const auth_route_1 = require("../module/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/course",
        route: course_routes_1.CourseRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
