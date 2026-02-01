const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    weather: {
      type: String,
      enum: ["hot", "warm", "cold"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", clothingItemSchema);
