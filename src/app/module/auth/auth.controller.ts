import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import jwt, { JwtPayload } from "jsonwebtoken";
const signup = catchAsync(async (req: Request, res: Response) => {
  const { ...signupData } = req.body;

  const result = await AuthService.signup(signupData);

  sendResponse<IUser | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Signup successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user login successfully",
    data: result,
  });
});
const enroll = catchAsync(async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;
  const { id } = req.body;
  const result = await AuthService.enroll(decoded.id, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course Enrolled successfully",
    data: result,
  });
});
const myCourse = catchAsync(async (req: Request, res: Response) => {
  const decoded = jwt.decode(req.headers.authorization as string) as JwtPayload;

  const result = await AuthService.myCourse(decoded.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Enrolled coursed successfully",
    data: result,
  });
});
export const AuthController = {
  signup,
  loginUser,
  enroll,
  myCourse,
};
