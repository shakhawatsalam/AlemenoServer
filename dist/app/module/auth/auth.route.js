"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", auth_controller_1.AuthController.signup);
router.put("/enroll", auth_controller_1.AuthController.enroll);
router.get("/my-course", auth_controller_1.AuthController.myCourse);
router.post("/login", auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
