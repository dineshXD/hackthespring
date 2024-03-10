import { Router } from "express";
import {
  addAvailability,
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
doctorRouter.post("/add-availability", addAvailability);
