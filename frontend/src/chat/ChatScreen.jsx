// import React, { useState, useEffect } from "react";
// import "./ChatScreen.css";
// import { Nav } from "../Nav";
// import io from "socket.io-client";
// import { useParams } from "react-router-dom";

// // const socket = io("http://localhost:4000");
// function ChatScreen() {
//   const id = useParams();
//   // const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [role, setRole] = useState(null);
//   const [messages, setMessages] = useState([]);
//   // Replace with your actual logic to connect to Socket.io and handle messages
//   useEffect(() => {
//     // Simulate receiving messages
//     const simulatedMessages = [
//       { sender: "doctor", message: "Hello, how can I help you today?" },
//       { sender: "patient", message: "Hi, I have a question about..." },
//     ];
//     setMessages(simulatedMessages);
//   }, []);

//   useEffect(() => {
//     // Handle initial connection and room joining based on user ID and role
//     // (You'll need to fetch user data and role from your authentication system)

//     // Example assuming user data is available
//     setUserId(id);
//     setRole("patient"); // Or 'doctor'

//     socket.emit("joinRoom", { userId, role });

//     return () => {
//       socket.disconnect(); // Disconnect on component unmount
//     };
//   }, []);

//   // const sendMessage = () => {
//   //   if (!message) return;

//   //   // Replace with your actual logic to send the message using Socket.io
//   //   const newMessage = { sender: "patient", message };
//   //   setMessages([...messages, newMessage]);
//   //   setMessage("");
//   // };
//   const sendMessage = (message) => {
//     // Retrieve recipient ID from the order (assuming it's available)

//     // (Replace with your logic to get recipient ID)
//     const recipientId = id;

//     socket.emit("sendMessage", { message, senderId: userId, recipientId });
//   };

//   const handleReceiveMessage = (data) => {
//     setMessages((messages) => [...messages, data]);
//   };

//   useEffect(() => {
//     socket.on("receiveMessage", handleReceiveMessage);

//     return () => {
//       socket.off("receiveMessage", handleReceiveMessage); // Clean up listener on unmount
//     };
//   }, [handleReceiveMessage]);
//   return (
//     <>
//       <Nav />
//       <div className="chat-screen">
//         <ul className="message-list">
//           {messages.map((message, index) => (
//             <li key={index} className={`message ${message.sender}`}>
//               {message.message}
//             </li>
//           ))}
//         </ul>
//         <div className="message-input">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ChatScreen;
