import { Request, Response } from "express";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import mongoose from "mongoose";

import ResponseModel from "../models/responseModel";
export const generateGPTResponse = async (req: Request, res: Response) => {
  const {
    orderId,
    fullName,
    medicalHistory,
    currentSymptoms,
    ongoingMedicine,
    vitalSigns,
  } = req.body;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(401).json({
      status: "Failed",
      message: "Please select valid order",
    });
  }
  const orderID = new mongoose.Types.ObjectId(orderId);
  const findResponse = await ResponseModel.findOne({ orderId: orderID });
  if (!findResponse) {
  } else {
    return res.status(200).json({
      status: "success",
      output: findResponse,
    });
  }
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
    const text = data.text();
    if (!data) {
      return res.status(400).json({
        status: "failed",
        message: "Failed to generate the gpt response",
      });
    }
    const responseData = await ResponseModel.create({
      orderId: orderID,
      gptResponse:
        text ||
        "Hey Sorry I am not available at this moment. Please try again later.",
    });
    return res.status(200).json({
      status: "success",
      message: "response generated successfully",
      // output: data[0].content.parts[0].text,
      output: responseData,
    });
  } catch (error) {
    console.log("gpt response error", error);
  }
};
