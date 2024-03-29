import express from "express";
import { authRouter } from "./routes/authRoute";
import cors from "cors";
import { doctorRouter } from "./routes/doctorRoute";
import { orderRouter } from "./routes/orderRoute";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/order", orderRouter);
export default app;
