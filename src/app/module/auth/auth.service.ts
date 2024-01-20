import httpStatus from "http-status";
import ApiError from "../../../errors/Apierror";
import { IUser } from "./auth.interface";
import User from "./auth.model";
import bcrypt from "bcrypt";
import { JwtHelper } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const signup = async (payload: IUser): Promise<IUser> => {
  const user = await User.findOne({ email: payload.email });

  // checking Email is already used or not
  if (user) {
    throw new ApiError(httpStatus.CONFLICT, "User is already used");
  }

  const { email, password, name } = payload;

  const hash = await bcrypt.hash(password, 12);

  const createPayload = {
    name,
    email,
    password: hash,
  };

  const result = await User.create(createPayload);
  return result;
};
export type ILogin = {
  email: string;
  password: string;
};
const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Not Found");
  }

  if (user) {
    const isPassMatched = await bcrypt.compare(password, user.password);

    if (!isPassMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password not matched");
    }

    const accessToken = JwtHelper.createToken(
      { id: user._id, email: user.email },
      config.jwt.secret as Secret,
      "30d"
    );

    return {
      accessToken,
    };
  }
};

export const AuthService = {
  signup,
  loginUser,
};
