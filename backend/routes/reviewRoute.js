import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

const reviewRouter = express.Router();

reviewRouter.get("/all", async (req, res) => {
  let reviewByUser = null;

  const { token } = req.headers;
  if (token) {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const userDoc = await userModel.findById(token_decode.id).lean();

    if (userDoc) {
      reviewByUser = await reviewModel.findOne({ userId: userDoc._id }).lean();
    }
  }

  const reviews = await reviewModel.find().lean();
  res.json({ reviewByUser, reviews });
});

reviewRouter.post("/update", authMiddleware, async (req, res) => {
  const { userId, text, score } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userDoc = await userModel.findById(userId).lean();
  if (!userDoc) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await reviewModel.updateOne(
    { userId: userDoc._id },
    {
      $set: {
        userId: userDoc._id,
        userName: userDoc.name,
        text,
        score,
      },
    },
    { upsert: true }
  );

  res.json({ message: "success" });
});

reviewRouter.delete("/delete", async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  const userId = token_decode.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userDoc = await userModel.findById(userId).lean();
  if (!userDoc) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await reviewModel.deleteOne({ userId: userDoc._id });

  res.json({ message: "success" });
});

export default reviewRouter;
