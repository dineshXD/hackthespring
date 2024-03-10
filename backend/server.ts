import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 3000;
const LOCALDB = process.env.DATABASE_LOCAL as string;
import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";
import Order from "./models/orderModel";
// const httpServer = new HttpServer(app);
// export const io = new SocketIOServer(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PATCH"],
//   },
// });
// httpServer.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });
mongoose.connect(LOCALDB).then(() => {
  console.log("Db successfully connected");
});
app.listen(port, () => {
  console.log("server running on", port);
});

// io.on("connection", (socket) => {
//   // Handle socket events
//   socket.on("joinRoom", ({ userId, role }) => {
//     const room = role === "doctor" ? `doctor-${userId}` : `patient-${userId}`;
//     socket.join(room);
//   });

//   socket.on("sendMessage", async ({ message, senderId, recipientId }) => {
//     try {
//       // ... (rest of the logic remains the same)
//       const order = await Order.findOne({
//         $or: [{ patientId: senderId }, { selectedDoctorId: senderId }],
//       });

//       if (!order) {
//         throw new Error("Order not found");
//       }

//       const recipientRole = senderId === order.patientId ? "doctor" : "patient";
//       const recipientId =
//         recipientRole === "doctor"
//           ? order.selectedDoctorId._id
//           : order.patientId._id;
//       const room =
//         recipientRole === "doctor"
//           ? `doctor-${recipientId}`
//           : `patient-${recipientId}`;

//       io.to(room).emit("receiveMessage", { message, senderId });
//     } catch (err) {
//       console.error(err.message);
//     }
//   });
// });
