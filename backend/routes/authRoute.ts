import express, { Response } from "express";
import {
  AuthenticatedRequest,
  isLoggedIn,
  login,
  logout,
  signup,
} from "../controllers/authController";

export const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get(
  "/check-user",
  isLoggedIn,
  (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({
      status: "success",
      isLoggedIn: true,
      user: req.user,
    });
  }
);

authRouter.post("/logout", logout);
