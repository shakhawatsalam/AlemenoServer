import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interface";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

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
export const AuthController = {
  signup,
  loginUser,
};
