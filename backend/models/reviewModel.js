import mongoose, { Schema } from "mongoose";
import userModel from "./userModel.js";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: userModel,
    immutable: true,
    unique:true
  },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: true },
});

const reviewModel =
  mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export default reviewModel;
