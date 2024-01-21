"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const auth_model_1 = __importDefault(require("./auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const course_model_1 = __importDefault(require("../course/course.model"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findOne({ email: payload.email });
    // checking Email is already used or not
    if (user) {
        throw new Apierror_1.default(http_status_1.default.CONFLICT, "User is already used");
    }
    const { email, password, name } = payload;
    const hash = yield bcrypt_1.default.hash(password, 12);
    const createPayload = {
        name,
        email,
        password: hash,
    };
    const result = yield auth_model_1.default.create(createPayload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield auth_model_1.default.findOne({ email: email });
    if (!user) {
        throw new Apierror_1.default(http_status_1.default.UNAUTHORIZED, "User Not Found");
    }
    if (user) {
        const isPassMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!isPassMatched) {
            throw new Apierror_1.default(http_status_1.default.UNAUTHORIZED, "Password not matched");
        }
        const accessToken = jwtHelpers_1.JwtHelper.createToken({ id: user._id, email: user.email }, config_1.default.jwt.secret, "30d");
        return {
            accessToken,
        };
    }
});
const enroll = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by ID
        const user = yield auth_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Find the course by ID
        const course = yield course_model_1.default.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        // Check if the course is already enrolled
        if (user.enRolledCourse.some((enrolledCourse) => String(enrolledCourse) === String(course._id))) {
            // Course is already enrolled, you can handle this as needed
            throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "Course is already enrolled");
        }
        // Add additional fields to the course before pushing it
        const courseToAdd = Object.assign(Object.assign({}, course.toObject()), { complete: false });
        // Add the course to the user's enRolledCourse array
        user.enRolledCourse.push(courseToAdd);
        // Save the updated user document
        yield user.save();
    }
    catch (errors) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, errors);
    }
});
const myCourse = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user by ID and populate the enRolledCourse array
        const user = yield auth_model_1.default.findById(userId).populate("enRolledCourse");
        if (!user) {
            throw new Error("User not found");
        }
        // Access the enrolled courses
        const enrolledCourses = user.enRolledCourse;
        // Do something with the enrolled courses (e.g., log or return them)
        return enrolledCourses;
        // If you want to return the enrolled courses, you can do:
        // return enrolledCourses;
    }
    catch (error) {
        console.error("Error retrieving enrolled courses:", error.message);
        // Handle the error accordingly
    }
});
exports.AuthService = {
    signup,
    loginUser,
    enroll,
    myCourse,
};
