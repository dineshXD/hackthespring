import { Router } from "express";
import {
  createDoctorProfile,
  getAllDoctors,
  getDoctorByID,
} from "../controllers/doctorController";
import { protect, restrictTo } from "../controllers/authController";

export const doctorRouter = Router();
doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorByID);
doctorRouter.use(protect);
doctorRouter.use(restrictTo("doctor"));
doctorRouter.post("/create-profile", createDoctorProfile);
