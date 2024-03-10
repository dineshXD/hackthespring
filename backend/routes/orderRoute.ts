import { Router } from "express";
import {
  bookConsultation,
  getMyOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController";
import { protect, restrictTo } from "../controllers/authController";

export const orderRouter = Router();
orderRouter.use(protect);
orderRouter.get("/get-doctor-orders", getMyOrders);
orderRouter.put("/update-order-status", updateOrderStatus);
// orderRouter.post("/generate-gpt-response", generateGPTResponse);
orderRouter.use(restrictTo("patient"));
orderRouter.post("/book-consultation", bookConsultation);
orderRouter.get("/get-user-orders", getUserOrders);
