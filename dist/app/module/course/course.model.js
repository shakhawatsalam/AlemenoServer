"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const courseModel = mongoose_1.default.model("Course", CourseSchema);
exports.default = courseModel;
