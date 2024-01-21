import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.put("/enroll", AuthController.enroll);
router.get("/my-course", AuthController.myCourse);
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
