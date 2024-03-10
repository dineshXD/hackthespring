import mongoose, { mongo } from "mongoose";

const responseSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide order id"],
  },
  gptResponse: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ResponseModel = mongoose.model("Response", responseSchema);
export default ResponseModel;
