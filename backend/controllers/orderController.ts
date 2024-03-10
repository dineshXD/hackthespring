import { Request, Response } from "express";
import Order from "../models/orderModel";
import { AuthenticatedRequest } from "./authController";
import { User } from "../models/userModel";
import mongoose from "mongoose";

export const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const doctorID = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(doctorID)) {
      return res.status(401).json({
        status: "Failed",
        message: "Please login as a doctor",
      });
    }
    const doctor = await User.findById(doctorID).where("role").equals("doctor");
    if (!doctor) {
      return res.status(401).json({
        status: "failed",
        message: "No doctor found",
      });
    }
    const orders = await Order.find({ selectedDoctorId: doctorID });
    if (!orders) {
      return res.status(400).json({
        status: "failed",
        message: "No orders found",
      });
    }
    return res.status(200).json({
      status: "success",
      results: orders.length,
      orders,
    });
  } catch (error) {
    console.log("error on getting my orders", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userID = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(401).json({
      status: "Failed",
      message: "Please login as a patient",
    });
  }
  const user = await User.findById(userID);
  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "No user found",
    });
  }
  const orders = await Order.find({ patientId: userID });
  if (!orders) {
    return res.status(400).json({
      status: "failed",
      message: "No orders found",
    });
  }
  return res.status(200).json({
    status: "success",
    results: orders.length,
    orders,
  });
};
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId, status } = req.body;
  if (!orderId || !status) {
    return res.status(404).json({
      status: "failed",
      message: "Please include all the fields",
    });
  }

  if (!["approved", "rejected"].includes(status)) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid status" });
  }
  try {
    const updateStatus = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status: status } },
      { new: true }
    );
    if (!updateStatus) {
      return res
        .status(404)
        .json({ status: "failed", message: "order not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "order status updated successfully",
      updateStatus,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const bookConsultation = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const {
      selectedDoctorID,
      email,
      fullName,
      age,
      gender,
      contactNumber,
      medicalHistory,
      currentSymptoms,
      ongoingMedicine,
      vitalSigns,
    } = req.body;
    if (
      !selectedDoctorID ||
      !email ||
      !fullName ||
      !age ||
      !gender ||
      !contactNumber ||
      !medicalHistory ||
      !currentSymptoms ||
      !ongoingMedicine ||
      !vitalSigns
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter all the fields",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(selectedDoctorID)) {
      return res.status(401).json({
        status: "Failed",
        message: "Please select valid doctor",
      });
    }
    const doctorId = new mongoose.Types.ObjectId(selectedDoctorID);
    const doctor = await User.findById(doctorId).where("role").equals("doctor");
    if (!doctor) {
      return res.status(401).json({
        status: "failed",
        message: "No doctor found",
      });
    }
    const patientId = req.user._id;
    const user = await User.findById(patientId);
    if (!user || user.role != "patient") {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }
    const order = await Order.create({
      patientId,
      selectedDoctorId: doctorId,
      email,
      fullName,
      age,
      gender,
      contactNumber,
      medicalHistory,
      currentSymptoms,
      ongoingMedicine,
      vitalSigns,
    });
    if (!order) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed to book consultation with doctor",
      });
    }
    return res.status(201).json({
      status: "success",
      message:
        "Your consultation is booked. Doctor will contact you in 24 hours.",
      order,
    });
  } catch (error) {
    console.log("error when creating order", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
