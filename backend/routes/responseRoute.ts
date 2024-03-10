import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController";
import { generateGPTResponse } from "../controllers/responseController";

export const responseRouter = Router();
responseRouter.use(protect);
responseRouter.use(restrictTo("doctor"));
responseRouter.post("/get-gpt-response", generateGPTResponse);
