import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide patient id"],
  },
  selectedDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide doctor id"],
  },
  email: {
    type: "String",
    required: [true, "Please provide email"],
  },
  fullName: {
    type: String,
    required: [true, "Please provide full name"],
  },
  age: {
    type: Number,
    required: [true, "Please provide your age"],
    min: 1,
    max: 100,
  },
  gender: {
    type: String,
    enum: ["male", "female", "notspecified"],
    required: [true, "Please specify your gender"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please enter valid contact number"],
    validator: function (v: string) {
      return /^\d{10}$/.test(v); // Check if it's exactly 10 digits
    },
    message: "please enter valid 10-digit phone number!",
  },
  medicalHistory: {
    type: String,
    required: [true, "Please specify your medical history"],
  },
  currentSymptoms: {
    type: String,
    required: [true, "Please provide your current symptoms"],
  },
  ongoingMedicine: {
    type: String,
    required: [true, "Please specify if u are taking any medicine currently"],
  },
  vitalSigns: {
    type: String,
    required: [true, "Please specify your vital signs"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});
const Order = mongoose.model("Orders", orderSchema);
export default Order;
// {
//     "email": "dinesh@gmail.com",
//     "contactNumber": "9999999999",
//     "age": "23",
//     "gender": "male",
//     "fullName": "Name last",
//     "medicalHistory": "hypertension",
//     "currentSymptoms": "Severe headache, blurry vision, nause",
//     "ongoingMedicine": "metformin for diabetes",
//     "vitalSigns": "Elevated blood pressure",
//     "selectedDoctorID": "65df7251e689ada50bd08935"
// }
