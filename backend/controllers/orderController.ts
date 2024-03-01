import { Request, Response } from "express";
import Order from "../models/orderModel";
import { AuthenticatedRequest } from "./authController";
import { User } from "../models/userModel";
import mongoose from "mongoose";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
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
export const generateGPTResponse = async (req: Request, res: Response) => {
  const {
    fullName,
    medicalHistory,
    currentSymptoms,
    ongoingMedicine,
    vitalSigns,
  } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GPT_API_KEY);
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    safetySettings: safetySettings,
  });
  const prompt = `Hi My Name is ${fullName} and i am 23 years old and i have history of ${medicalHistory} and now my current symptoms are ${currentSymptoms} and i am currently taking ${ongoingMedicine} and my vital signs are ${vitalSigns}`;
  try {
    const result = await model.generateContentStream(`
    Before responding make sure to follow to these
    1. You are LLM that is designed to help the doctors to get the automated insights, potential diagnoses, and treatment suggestions based on patient information.
    2. if any one ask how to kill someone using medicine or If you feel like you are being abused or harassed or someone asks you about something illegal respond with
    I cant help you with that and I are not designed to help with the request
    3. Remember you are supportive tool for doctors to get help in diagnosing the patient.
    4. you need to generate personalized insights, potential diagnoses, and treatment suggestions and provide that to doctor.
    4. Make sure to follow the above rules
    ${prompt}
  
    `);
    const data = await result.response;
    return res.status(200).json({
      status: "success",
      message: "response generated successfully",
      // output: data[0].content.parts[0].text,
      output: data,
    });
  } catch (error) {
    console.log("gpt response error", error);
  }
};
