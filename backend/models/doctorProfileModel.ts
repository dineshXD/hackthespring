import mongoose from "mongoose";
const availabilitySlotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const DoctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "please provide user id"],
  },
  specializations: {
    type: String,
    required: [true, "Please provide your specialization"],
  },
  location: {
    type: String,
    required: [
      true,
      "Please provide your hospital location or where you are working",
    ],
  },
  yearsOfExperience: {
    type: Number,
    required: [true, "Please provide your years of experience."],
  },
  education: {
    type: String,
    required: [true, "Please provide education details e.g. MBBS"],
  },
  bio: { type: String, required: [true, "Please tell me about yourself"] },
  availability: {
    type: [availabilitySlotSchema],
    required: [true, "Doctor must have availabilty"],
  },
});
const DoctorProfile = mongoose.model("DoctorProfile", DoctorProfileSchema);
export default DoctorProfile;
