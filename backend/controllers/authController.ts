import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";
import { User, UserDocument } from "../models/userModel";
import bcrypt from "bcryptjs";

export interface AuthenticatedRequest extends Request {
  user?: any; // Add the user property with the appropriate type
}
const checkPassword = async (paramPassword: string, userPassword: string) => {
  return await bcrypt.compare(paramPassword, userPassword);
};
const signToken = (id: mongoose.ObjectId) => {
  return sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user: any, statusCode: number, res: Response) => {
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  }
  const token = signToken(user.id);
  const expiryString = process.env.JWT_COOKIE_EXPIRES_IN || "90";
  const expiry: number = parseInt(expiryString);
  const cookieOptions: {
    expires: Date;
    httpOnly: boolean;
    path: string;
    secure: boolean;
    sameSite: "none" | "strict" | "lax" | boolean;
  } = {
    expires: new Date(Date.now() + expiry * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    secure: false,
    sameSite: "lax",
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await checkPassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email and password",
      });
    }
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to login",
      error: error,
    });
  }
};
export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, confirmPassword, role } = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter all the fields",
      });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
      confirmPassword,
      role,
    });
    createSendToken(newUser, 201, res);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "failed",
        message: "user already exist",
      });
    } else {
      return res.status(500).json({
        status: "failed",
        message: "Internal server error! failed to create new user",
        err: error,
      });
    }
  }
};

export const isLoggedIn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized access! Please login again",
      });
    }
    const token = cookie.split("jwt=")[1];
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Invaild JWT Token",
      });
    }
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (!decoded || !decoded?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid JWT token",
      });
    }
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Error in isLoggedIn function:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    };
    if (process.env.NODE_ENV === "production") {
      //  (cookieOptions.sameSite = "none");
      const updatedCookieOptions = {
        ...cookieOptions,
        secure: true,
      };
      res.cookie("jwt", "none", updatedCookieOptions);
      res.status(200).json({ success: true });
    }
    res.cookie("jwt", "none", cookieOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({
      status: "success",
      message: "Failed to logout user",
    });
  }
};

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized access! Please login again",
    });
  }
  const token = cookie.split("jwt=")[1];
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid JWT token",
    });
  }
  const decoded = verify(token, process.env.JWT_SECRET || "") as JwtPayload;
  if (!decoded || !decoded.id) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token payload",
    });
  }
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "failed",
      message: "User not found",
    });
  }
  req.user = currentUser;
  next();
};
export const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};
