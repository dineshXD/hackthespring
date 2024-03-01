import { Request, Response } from "express";
import DoctorProfile from "../models/doctorProfileModel";
import { AuthenticatedRequest } from "./authController";
import { User } from "../models/userModel";
import mongoose from "mongoose";
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    if (doctors.length <= 0) {
      return res.status(200).json({
        status: "failed",
        message: "No user found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        results: doctors.length,
        doctors,
      });
    }
  } catch (error) {
    console.log("error at getting doctors");
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
export const getDoctorByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // if (!id) {
    // }
    if (!mongoose.Types.ObjectId.isValid(id) && !id) {
      return res.status(404).json({
        status: "failed",
        message: "Please enter valid user id",
      });
    }

    const doctor = await User.findById(id).where("role").equals("doctor");

    if (!doctor) {
      return res.status(400).json({
        status: "failed",
        message: "User not found or not a doctor",
      });
    }
    return res.status(200).json({
      status: "success",
      doctor,
    });
  } catch (error) {
    console.log("error when finding user by id", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
export const createDoctorProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { specializations, location, yearsOfExperience, education, bio } =
      req.body;
    if (
      !specializations ||
      !location ||
      !yearsOfExperience ||
      !education ||
      !bio
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter all the fields",
      });
    }
    const user = await User.findById(req.user._id);
    if (!user || user.role != "doctor") {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
    const isProfileAlreadyExist = await DoctorProfile.findOne({
      userId: req.user._id,
    });
    if (isProfileAlreadyExist) {
      return res.status(401).json({
        status: "failed",
        message: "Your profile already exist. Please update it if necessary.",
        //   redirectUrl: "/edit-profile", // Replace with your redirect URL
      });
      // Option 2: Allow profile update (if desired):
      // const updatedProfile = await DoctorProfile.findOneAndUpdate(
      //   { userId },
      //   { ...req.body }, // Update specific fields
      //   { new: true } // Return the updated profile
      // );
      // if (!updatedProfile) {
      //   return res.status(500).json({
      //     status: "failed",
      //     message: "Failed to update profile.",
      //   });
      // }
      // return res.status(200).json({
      //   status: "success",
      //   message: "Profile updated successfully.",
      //   profile: updatedProfile,
      // });
    }
    const userId = req.user._id;
    const profile = await DoctorProfile.create({
      userId,
      specializations,
      location,
      yearsOfExperience,
      education,
      bio,
    });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { specializations: specializations } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //another method to create doctor profile
    // const newProfile = new DoctorProfile({
    //     userId,
    //     specialization,
    //     location,
    //     yearsOfExperience,
    //     education,
    //     bio,
    //   });

    //   const savedProfile = await newProfile.save();
    if (!profile) {
      return res.status(400).json({
        status: "failed",
        message: "Failed to create new profile",
      });
    }
    return res.status(201).json({
      status: "success",
      message: "Profile create successfully",
      profile,
    });
  } catch (error) {
    console.error(error.message); // Log errors for debugging purposes
    return res.status(500).json({
      status: "failed",
      message: "Failed to create profile. Please try again later.",
    });
  }
};
